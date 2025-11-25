#!/bin/bash

# Hapus file lama
rm -f blueprint.md

# Cari semua file .md dan .mdx
find . -type f \( -name "*.md" -o -name "*.mdx" \) | while read file; do
  echo "## $file" >> blueprint.md
  echo "" >> blueprint.md
  echo '```mdx' >> blueprint.md
  cat "$file" >> blueprint.md
  echo '```' >> blueprint.md
  echo "---" >> blueprint.md
  echo "" >> blueprint.md
done

echo "✅ File blueprint.md berhasil dibuat."
