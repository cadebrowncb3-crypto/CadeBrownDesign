"""Generate public/favicon.svg: "CB" in Archivo 800 (yellow #FDF48B on black).
Usage: pip install fonttools brotli
       python3 tools/favicon.py node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2 public/favicon.svg
The PNG/ICO sizes (apple-touch-icon.png, icon-512.png, favicon.ico) were rendered from this SVG."""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

font = TTFont(sys.argv[1])
font = instantiateVariableFont(font, {"wght": 800, "wdth": 96})
gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font["head"].unitsPerEm
text, tracking = "CB", -0.02 * upm

# lay out glyphs, collect path in font units (y up)
x = 0; items = []
for ch in text:
    g = cmap[ord(ch)]; items.append((g, x)); x += gs[g].width + tracking
bp = BoundsPen(gs)
for g, dx in items:
    gs[g].draw(TransformPen(bp, (1, 0, 0, 1, dx, 0)))
xmin, ymin, xmax, ymax = bp.bounds
w, h = xmax - xmin, ymax - ymin

S, inner = 64, 46.0           # canvas, target letter-block width
s = inner / w
tx = (S - w * s) / 2 - xmin * s
ty = (S + h * s) / 2 + ymin * s   # flip y: y' = ty - y*s
pen = SVGPathPen(gs)
for g, dx in items:
    gs[g].draw(TransformPen(pen, (s, 0, 0, -s, tx + dx * s, ty)))
d = pen.getCommands()
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}"><rect width="{S}" height="{S}" rx="12" fill="#0d0d0d"/><path fill="#fdf48b" d="{d}"/></svg>
'''
open(sys.argv[2], "w").write(svg)
print("letters", round(w * s, 1), "x", round(h * s, 1), "svg bytes", len(svg))
