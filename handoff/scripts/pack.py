import zipfile, os, sys
src, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
    ct = os.path.join(src, '[Content_Types].xml')
    z.write(ct, '[Content_Types].xml')
    for root, _, files in os.walk(src):
        for f in files:
            p = os.path.join(root, f); a = os.path.relpath(p, src).replace(os.sep, '/')
            if a != '[Content_Types].xml': z.write(p, a)
print('packed', out)
