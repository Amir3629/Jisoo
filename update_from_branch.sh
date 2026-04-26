#!/bin/bash
# 💻 Bash script برای clone و run آخرین branch

# 1️⃣ مسیر جدید برای کلون
PROJECT_DIR="$HOME/Downloads/Jisoo-latest"

# 2️⃣ اگر فولدر قبلی هست، حذف کن
if [ -d "$PROJECT_DIR" ]; then
    echo "==> حذف فولدر قدیمی: $PROJECT_DIR"
    rm -rf "$PROJECT_DIR"
fi

# 3️⃣ کلون کردن آخرین branch
echo "==> کلون کردن branch codex/update-homepage-hero-designs-7uebbz..."
git clone --branch codex/update-homepage-hero-designs-7uebbz https://github.com/Amir3629/Jisoo.git "$PROJECT_DIR"

cd "$PROJECT_DIR" || exit

# 4️⃣ نصب node modules
echo "==> نصب dependency ها..."
npm install

# 5️⃣ آزادسازی پورت 3000 اگر اشغال است
PORT=3000
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
    echo "==> Port $PORT در حال استفاده توسط PID $PID. Killing process..."
    kill -9 $PID
fi

# 6️⃣ اجرای TypeScript check
echo "==> اجرای TypeScript check..."
npx tsc --noEmit

