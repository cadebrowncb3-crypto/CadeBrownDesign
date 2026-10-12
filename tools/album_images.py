"""Export the "Nothing But Time" images from EP-Presentation-CadeBrown.pptx.
Usage: python3 -I tools/album_images.py <unzipped-pptx>/ppt/media
JPEGs are copied byte-for-byte. PNGs become WebP (q90, alpha kept) scaled down
uniformly to <= 2000 px on the long edge — never cropped. The two typography
details are cut exactly where the deck's slide 9 crops them (native pixels).
The research slide's reference images (other artists' work) are not exported."""
import json, os, shutil, sys
from PIL import Image

media = sys.argv[1]
out_dir = "public/images/nothing-but-time"
os.makedirs(out_dir, exist_ok=True)
manifest = {}

def rec(name):
    p = os.path.join(out_dir, name)
    w, h = Image.open(p).size
    manifest[name] = {"w": w, "h": h, "kb": os.path.getsize(p) // 1024}

def jpg(src, name):
    shutil.copyfile(os.path.join(media, src), os.path.join(out_dir, name)); rec(name)

def webp(src, name, box=None, edge=2000):
    im = Image.open(os.path.join(media, src))
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
    if box:  # fractional crop (left, right, top, bottom) as set in the deck
        w, h = im.size
        l, r, t, b = box
        im = im.crop((round(w * l), round(h * t), round(w * (1 - r)), round(h * (1 - b))))
    w, h = im.size
    s = min(1, edge / max(w, h))
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im.save(os.path.join(out_dir, name), "WEBP", quality=90, method=6); rec(name)

jpg("image1.jpeg", "package-front-back.jpg")
jpg("image5.jpeg", "mark-making.jpg")
webp("image7.png", "documented-front.webp")
webp("image8.png", "documented-back.webp")
webp("image9.png", "insert-spread.webp")
jpg("image10.jpeg", "front-cover.jpg")
jpg("image11.jpeg", "detail-halftone.jpg")
jpg("image12.jpeg", "detail-layered-paper.jpg")
jpg("image13.jpeg", "detail-hand-marks.jpg")
jpg("image14.jpeg", "motif-eye-front.jpg")
jpg("image15.jpeg", "motif-eye-back.jpg")
webp("image16.png", "type-detail-back.webp", box=(0.558, 0.270, 0.313, 0.471))
webp("image17.png", "type-detail-insert.webp", box=(0.104, 0.616, 0.261, 0.610))
jpg("image19.jpeg", "label-side-a.jpg")
webp("image20.png", "record-side-a.webp")
jpg("image22.jpeg", "outcome-front-side-a.jpg")
jpg("image23.jpeg", "outcome-back-side-b.jpg")
print(json.dumps(manifest, indent=1))
