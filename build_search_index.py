#!/usr/bin/env python3
"""Build search index from all HTML pages."""
import os
import re
import json
from pathlib import Path

DOCS_DIR = Path("docs")
INDEX_OUTPUT = DOCS_DIR / "search-index.json"

def extract_content_from_html(html_content):
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(r'<!--.*?-->', '', html_content, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', html_content)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'[^\w\s.,;:!?()\-–—\'"%/]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_title_from_html(html_content):
    match = re.search(r'<title>([^<]+)</title>', html_content, re.IGNORECASE)
    return match.group(1).strip() if match else "Untitled"

def index_page(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        title = extract_title_from_html(content)

        main_match = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL | re.IGNORECASE)
        if main_match:
            body_content = main_match.group(1)
        else:
            body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
            body_content = body_match.group(1) if body_match else content

        text_content = extract_content_from_html(body_content)
        url = "/" + str(filepath.relative_to(DOCS_DIR)).replace("\\", "/")

        return {"title": title, "url": url, "content": text_content}
    except Exception as e:
        print(f"Error indexing {filepath}: {e}")
        return None

def main():
    pages = []
    for html_file in DOCS_DIR.rglob("*.html"):
        entry = index_page(html_file)
        if entry:
            pages.append(entry)
            print(f"Indexed: {entry['url']} - {entry['title'][:50]}")

    with open(INDEX_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(pages, f, ensure_ascii=False, indent=2)

    print(f"\nSearch index built: {len(pages)} pages")
    print(f"Output: {INDEX_OUTPUT}")

if __name__ == "__main__":
    main()