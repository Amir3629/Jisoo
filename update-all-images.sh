#!/bin/bash

# مسیر تصاویر جدید
NEW_IMAGES=(
"/Product images/Jisoo 6.png"
"/Product images/jisoo 99.png"
"/Product images/jisoo4.png"
"/Product images/jisoo7.png"
"/Product images/jisoo8.png"
"/Product images/jisoo9.png"
"/Product images/jisoo99.png"
"/Product images/jisooo77.png"
)

# --- 1. کپی تصاویر به پوشه public ---
mkdir -p public/assets/editorial
mkdir -p "public/Product images"

cp "/Users/amir/Downloads/b_qh75CM5TOI3/public/assets/editorial/before-care.png" public/assets/editorial/
cp "/Users/amir/Downloads/b_qh75CM5TOI3/public/assets/editorial/after-care.png" public/assets/editorial/
cp "/Users/amir/Downloads/b_qh75CM5TOI3/public/Product images/"*.png "public/Product images/"

echo "✅ تصاویر کپی شدند."

# --- 2. جایگزینی مسیر تصاویر در فایل‌های lib ---
FILES_LIB=(
"lib/products.ts"
"lib/data.ts"
"lib/image-fallbacks.ts"
)

for FILE in "${FILES_LIB[@]}"
do
  if [ -f "$FILE" ]; then
    # جایگزینی تمام مسیرهLE"
    sed -i '' "s|/Product images/.*\.png|${NEW_IMAGES[0]}|g" "$FILE"
    echo "✅ تصاویر در $FILE بروزرسانی شدند."
  fi
done

# --- 3. جایگزینی تصاویر در کامپوننت‌های صفحه اصلی و فروشگاه ---
COMPONENTS=(
"components/home/care-cta-section.tsx"
"components/home/categories-section.tsx"
"components/home/featured-products.tsx"
"components/home/hero-section.tsx"
"components/home/partners-section.tsx"
"components/product/product-card.tsx"
"app/product/page.tsx"
)

for FILE in "${COMPONENTS[@]}"
do
  if [ -f "$FILE" ]; then
    for i in "${!NEW_IMAGES[@]}"NEW_IMAGES[i]}|g" "$FILE"
    done
    echo "✅ تصاویر در $FILE جایگزین شدند."
  fi
done

echo "🎉 تمام تصاویر پروژه آپدیت شدند."
