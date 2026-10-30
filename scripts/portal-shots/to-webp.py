import json, pathlib, sys
from PIL import Image
src = pathlib.Path(sys.argv[1]); dst = pathlib.Path(sys.argv[2]); dst.mkdir(parents=True, exist_ok=True)
dims = {}
for p in sorted(src.glob("*.png")):
    im = Image.open(p).convert("RGB")
    w = 2000; h = round(im.height * w / im.width)
    im = im.resize((w, h), Image.LANCZOS)
    im.save(dst / (p.stem + ".webp"), "WEBP", quality=80, method=6)
    key = p.stem.rsplit("-", 1)[0]  # drop -light/-dark
    dims[key] = [w, h]
out = "// Generated from the portal screenshots: intrinsic size per screen and language.\nexport const shotSizes: Record<string, [number, number]> = " + json.dumps(dims, indent=2) + ";\n"
pathlib.Path(sys.argv[3]).write_text(out)
total = sum(f.stat().st_size for f in dst.glob("*.webp"))
print(len(list(dst.glob("*.webp"))), "files", round(total / 1024), "KB")
