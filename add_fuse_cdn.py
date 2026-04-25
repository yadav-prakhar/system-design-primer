#!/usr/bin/env python3
"""Add Fuse.js CDN to all HTML pages."""
import os
import re
from pathlib import Path

DOCS_DIR = Path("docs")
FUSE_CDN = '<script src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>'

def add_cdn_to_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'fuse.min.js' in content:
            return False

        head_end = content.find('</head>')
        if head_end == -1:
            return False

        new_content = content[:head_end] + FUSE_CDN + '\n' + content[head_end:]

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    count = 0
    for html_file in DOCS_DIR.rglob("*.html"):
        if add_cdn_to_file(html_file):
            print(f"Added Fuse.js CDN to: {html_file}")
            count += 1

    print(f"\nUpdated {count} files")

if __name__ == "__main__":
    main()