import markdown

md_text = """
# Заголовок
Это **жирный** текст.
"""

html = markdown.markdown(md_text)
print(html)