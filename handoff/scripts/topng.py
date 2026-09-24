import fitz, sys, os
pdf, prefix, pages = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ''
d = fitz.open(pdf); want = set()
for part in filter(None, pages.split(',')):
    a, _, b = part.partition('-'); want.update(range(int(a), int(b or a) + 1))
for i, p in enumerate(d, 1):
    if want and i not in want: continue
    p.get_pixmap(dpi=int(os.environ.get('DPI', 80))).save(f'{prefix}-{i:02d}.png')
print(len(d), 'pages')
