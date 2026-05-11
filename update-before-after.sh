#!/bin/bash

# مسیر تصاویر واقعی
BEFORE="/assets/editorial/before-care.png"
AFTER="/assets/editorial/after-care.png"

# فایل‌هایی که ممکن است از تصاویر before/after استفاده کنند
FILES=(
"components/home/care-cta-section.tsx"
"components/home/hero-section.tsx"
"components/home/featured-products.tsx"
"components/home/categories-section.tsx"
"components/home/ritual-section.tsx"
"app/product/page.tsx"
)

for FILE in "${FILES[@]}"
do
  if [ -f "$FILE" ]; then
    # جایگزینی هر مسیر png قدیمی با تصاویر واقعی before/after
    sed -i '' "s|/assets/editorial/before-.*\.png|$BEFORE|g" "$FILE"
    sed -i '' "s|/assets/editorial/after-.*\.png|$AFTER|g" "$FILE"
    echo "✅ فایل $FILE بروزرسانی شد."
  fi
done

echo "🎉 تمام مسیرهای Before / After بروزرسانی شدند."
