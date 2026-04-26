#!/bin/bash
set -e

# 1️⃣ جایگزینی hero-section.tsx با نسخه صحیح (PR1 + Design11Hero)
echo "==> Replacing hero-section.tsx with clean version..."
cat > components/home/hero-section.tsx <<'EOF'
PASTE_HERE_CLEAN_HERO_SECTION_TSX
EOF

# 2️⃣ اجرای git add/commit/push
git add components/home/hero-section.tsx
git commit -m "Overwrite hero-section.tsx with clean PR1 + Design11Hero" || echo "No changes to commit"
git push origin main

# 3️⃣ پاکسازی پورت 3000 در صورت اشغال
PORT=3000
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
    echo "==> Port $PORT in use by PID $PID. Killing..."
    kill -9 $PID
fi

# 4️⃣ اجرای TypeScript check
echo "==> Running TypeScript check..."
npx tsc --noEmit

# 5️⃣ اجرای Dev server
echo "==> Starting Next.js dev server..."
npm run dev
