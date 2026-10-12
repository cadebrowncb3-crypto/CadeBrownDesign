"""Make web versions of full-size originals in source-images/.
Aspect ratio is preserved exactly (uniform scale only, never cropped); images
are only ever scaled down. Output: WebP, quality 90."""
import json, os, sys
from PIL import Image

JOBS = [  # (source, output, max long edge)
    ("source-images/momentum3/Momentum3_Beanie_02_model_4x.png", "public/images/momentum3/beanie-model.webp", 1800),
    ("source-images/momentum3/Momentum3_Cap_02_model_4x.png", "public/images/momentum3/cap-model.webp", 1800),
    ("source-images/momentum3/Instagram Feed Phone Mockup.png", "public/images/momentum3/instagram-feed.webp", 1800),
    ("source-images/momentum3/Momentum³ Countdown on Instagram.png", "public/images/momentum3/instagram-countdown.webp", 1800),
    ("source-images/momentum3/Momentum³ Sticker Collection.png", "public/images/momentum3/sticker-collection.webp", 1800),
    ("source-images/momentum3/Momentum³ Watersports Tower.png", "public/images/momentum3/watersports-tower.webp", 2200),
]

out = {}
for src, dst, edge in JOBS:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(1, edge / max(w, h))
    if scale < 1:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    im.save(dst, "WEBP", quality=90, method=6)
    nw, nh = im.size
    out[dst] = {"w": nw, "h": nh, "src_ratio": round(w / h, 4), "out_ratio": round(nw / nh, 4), "kb": os.path.getsize(dst) // 1024}
print(json.dumps(out, indent=1))
