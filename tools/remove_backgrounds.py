# Background removal used for the product shots (run with: pip install "rembg[cpu]" scipy pillow numpy).
# python3 tools/remove_backgrounds.py <input image> <output.webp> <preview.jpg>
# Originals are kept in source-images/original-backgrounds/.
"""Remove a plain studio backdrop while keeping the cast shadow.
object alpha  : BiRefNet segmentation (rembg)
backdrop      : smooth quadratic surface fitted to the image border (shadow-free)
shadow alpha  : how much darker than the backdrop each pixel is (multiplicative),
                stored as black with that alpha so it darkens whatever it sits on."""
import sys, numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, binary_fill_holes
from rembg import remove, new_session

_sess = None
def session():
    global _sess
    if _sess is None: _sess = new_session('birefnet-general')
    return _sess

def fit_backdrop(img, frame=0.05):
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    m = np.zeros((h, w), bool); fh, fw = max(2, int(h * frame)), max(2, int(w * frame))
    m[:fh] = m[-fh:] = True; m[:, :fw] = m[:, -fw:] = True
    X = np.stack([np.ones_like(xx), xx / w, yy / h, (xx / w) ** 2, (yy / h) ** 2, (xx / w) * (yy / h)], -1).astype(np.float32)
    out = np.zeros_like(img)
    L = img.mean(-1)
    sel = m.copy()
    for _ in range(3):  # robust: drop dark outliers (stray shadow at the border) and refit
        A = X[sel]
        coefs = [np.linalg.lstsq(A, img[..., c][sel], rcond=None)[0] for c in range(3)]
        fit = np.stack([X @ k for k in coefs], -1)
        resid = L - fit.mean(-1)
        sel = m & (resid > -0.025)
    return np.clip(fit, 1e-3, 1)

def cutout(src, dst, dead=0.02, soften=1.0, obj_mask_out=None):
    im = Image.open(src).convert('RGB')
    rgb = np.asarray(im).astype(np.float32) / 255
    a_o = np.asarray(remove(im, session=session(), only_mask=True)).astype(np.float32) / 255
    # Close interior holes the model can leave inside an object (solid within its outline).
    solid = binary_fill_holes(a_o > 0.5)
    a_o = np.where(solid, np.maximum(a_o, 1.0), a_o)
    B = fit_backdrop(rgb)
    r = (rgb.mean(-1)) / B.mean(-1)
    a_s = np.clip((1 - r - dead) / (1 - dead), 0, 1)
    a_s = gaussian_filter(a_s, soften)
    a = a_o + (1 - a_o) * a_s
    color = np.where(a[..., None] > 1e-4, (a_o[..., None] * rgb) / np.maximum(a[..., None], 1e-4), 0)
    out = np.dstack([np.clip(color, 0, 1), a])
    Image.fromarray((out * 255 + 0.5).astype(np.uint8), 'RGBA').save(dst, 'WEBP', quality=90, alpha_quality=100, method=6)
    if obj_mask_out: Image.fromarray((a_o * 255).astype(np.uint8)).save(obj_mask_out)
    return dict(edge_backdrop=tuple(int(x * 255) for x in B[0, 0]), max_shadow=float(a_s.max()))

def preview(dst, prev, bgs=((226, 227, 216), (237, 238, 229), (13, 13, 13))):
    im = Image.open(dst).convert('RGBA'); w, h = im.size; s = 420 / max(w, h)
    t = im.resize((int(w * s), int(h * s)), Image.LANCZOS)
    sheet = Image.new('RGB', (t.width * 4 + 30, t.height), (255, 0, 255))
    orig = Image.open(sys.argv[1]).convert('RGB').resize(t.size, Image.LANCZOS); sheet.paste(orig, (0, 0))
    for k, c in enumerate(bgs):
        bg = Image.new('RGB', t.size, c); bg.paste(t, (0, 0), t); sheet.paste(bg, ((k + 1) * (t.width + 10), 0))
    sheet.save(prev)

if __name__ == '__main__':
    print(cutout(sys.argv[1], sys.argv[2]))
    preview(sys.argv[2], sys.argv[3])
