# --- 2. Update Care Formulas / Gallery / Ritual slides ---

# Define the 8 new product images paths
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

FILES=(
"components/home/care-cta-section.tsx"
"components/home/categories-section.tsx"
"app/product/page.tsx"
)

for FILE in "${FILES[@]}"
do
  if [ -f "$FILE" ]; then
    # Replace any existing slides array with the new images
    sed -i '' "s|const slides = .*|const slides = (\"${NEW_IMAGES[0]}\", \"${NEW_IMAGES[1]}\", \"${NEW_IMAGES[2]}\", \"${NEW_IMAGES[3]}\", \"${NEW_IMAGES[4]}\", \"${NEW_IMAGES[5]}\", \"${NEW_IMAGES[6]}\", \"${NEW_IMAGES[7]}\");|g" "$FILE"
    echo "✅ Updated slides in $FILE"
  fi
done

echo "🎉 All slides updated with new images."
