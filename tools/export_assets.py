"""Export portfolio images extracted from the PDF into the site's public/ folder.
JPEGs without transparency are byte-for-byte copies of the streams embedded in the PDF.
Images with a soft mask are saved as lossless WebP (pixels unchanged, alpha preserved).
Magazine mockups are cropped to the same framing the PDF uses (cover vs. spread)."""
import json, os, shutil, sys
from PIL import Image

src, merged, out = sys.argv[1], sys.argv[2], sys.argv[3]
manifest = {}

def rec(rel, path):
    w, h = Image.open(path).size
    manifest[rel] = {"w": w, "h": h, "kb": round(os.path.getsize(path) / 1024)}

def copy_jpg(idx, rel):
    dst = os.path.join(out, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(f"{src}/img-{idx:03d}.jpg", dst); rec(rel, dst)

def webp(idx, rel, box=None):
    dst = os.path.join(out, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
    im = Image.open(f"{merged}/m-{idx:03d}.png")
    if box: im = im.crop(box)
    im.save(dst, "WEBP", lossless=True, quality=100, method=6); rec(rel, dst)

webp(0, "images/cover/portfolio-cover-graphic.webp")
copy_jpg(2, "images/about/cade-brown.jpg")
# Editorial — Cold Blooded
copy_jpg(4, "images/cold-blooded/cover-mockup.jpg")
copy_jpg(8, "images/cold-blooded/spreads-overview.jpg")
COVER, SPREAD = (24, 50, 189, 342), (189, 50, 492, 342)
webp(10, "images/cold-blooded/front-cover.webp", COVER)
order = [10, 14, 18, 22, 12, 16, 20, 24, 26, 30, 34, 38, 28, 32, 36, 40]
for n, idx in enumerate(order, 1):
    webp(idx, f"images/cold-blooded/spread-{n:02d}.webp", SPREAD)
webp(42, "images/cold-blooded/back-cover.webp", COVER)
# Branding — Momentum3
copy_jpg(44, "images/momentum3/athlete-wetsuit.jpg")
copy_jpg(46, "images/momentum3/event-arch.jpg")
webp(48, "images/momentum3/beanie.webp")
copy_jpg(50, "images/momentum3/beanie-and-cap.jpg")
copy_jpg(52, "images/momentum3/hoodie.jpg")
# Posters
copy_jpg(58, "images/posters/poster-geometric-collage.jpg")
copy_jpg(56, "images/posters/poster-orange-collage.jpg")
copy_jpg(54, "images/posters/poster-vivo-rio.jpg")
copy_jpg(66, "images/posters/poster-warrior-aesthetic.jpg")
copy_jpg(64, "images/posters/poster-every-moment-counts.jpg")
# Experience — Media Production Group
copy_jpg(68, "images/experience/gala-program.jpg")
copy_jpg(70, "images/experience/harbert-tee.jpg")
copy_jpg(72, "images/experience/harbert-magazine.jpg")
copy_jpg(74, "images/experience/harbert-tee-cap.jpg")

json.dump(manifest, open(os.path.join(out, "images", "manifest.json"), "w"), indent=1)
for k, v in manifest.items(): print(k, v)
