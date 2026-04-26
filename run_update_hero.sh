#!/bin/bash

# ===============================
# RUN THIS SCRIPT TO UPDATE HERO SECTION
# ===============================

set -e  # exit on error

# 1️⃣ Path to the clean HeroSection code file
CLEAN_HERO_FILE="/Users/amir/Downloads/b_qh75CM5TOI3/components/home/hero-section.tsx"

# 2️⃣ Target file in your project
TARGET_HERO_FILE="./components/home/hero-section.tsx"

echo "==> Replacing hero-section.tsx with clean version..."
cp "$CLEAN_HERO_FILE" "$TARGET_HERO_FILE"

# 3️⃣ Stage the file
git add "$TARGET_HERO_FILE"

# 4️⃣ Commit changes
git commit -m "Update hero-section.tsx with clean PR1 + Design11Hero"

# 5️⃣ Push to remote
git push origin main

# 6️⃣ Kill port 3000 if already in use
PORT=3000
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
    echo "==> Port $PORT is in use by PID $PID. Killing process..."
    kill -9 $PID
fi

# 7️⃣ Run TypeScript check
echo "==> Running TypeScript check..."
npx tsc --noEmit

# 8️⃣ Start Next.js dev server
echo "==> Starting Next.js de
