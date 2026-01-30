import os

BASE_DIR = "../notes"

classes = [
    "class-1", "class-2", "class-3", "class-4", "class-5",
    "class-6", "class-7", "class-8", "class-9",
    "class-10", "class-11", "class-12"
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{title} | Mathify</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>{title}</h1>
<p>Curated study notes for {title}.</p>

<ul>
  <li>Coming soon…</li>
</ul>

<p><a href="../index.html">← Back to Notes</a></p>

</body>
</html>
"""

for cls in classes:
    path = os.path.join(BASE_DIR, cls)
    os.makedirs(path, exist_ok=True)

    file_path = os.path.join(path, "index.html")
    title = cls.replace("-", " ").title()

    with open(file_path, "w") as f:
        f.write(HTML_TEMPLATE.format(title=title))

    print(f"Generated {file_path}")

