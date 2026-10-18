# Downscale a tall screenshot and split into viewable chunks: split.py <png> <width> <chunkHeight>
import sys
from PIL import Image
p, w, ch = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
im = Image.open(p).convert('RGB'); r = w / im.width
im = im.resize((w, int(im.height * r)))
n = 0
for y in range(0, im.height, ch):
    im.crop((0, y, w, min(y + ch, im.height))).save(p.replace('.png', f'_part{n}.jpg'), quality=70); n += 1
print(p, n, 'parts', im.height)
