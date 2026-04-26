#!/bin/bash
# Full workflow script for merging Codex hero updates and running local dev

# مسیر پروژه
cd /Users/amir/Downloads/b_qh75CM5TOI3 || exit 1

echo "==> Check git status"
git status --short

echo "==> Prune & fetch latest"
git fetch origin --prune
git checkout main
git pull origin main

echo "==> Fetch Codex branch"
git fetch origin codex/update-homepage-hero-designs-dp34vc:codex/update-homepage-hero-designs-dp34vc

echo "==> Merge Codex branch into main"
git merge --no-ff codex/update-homepage-hero-designs-dp34vc -m "Merge Codex homepage hero updates"

# چک برای conflict
if git ls-files -u | grep -q .; then
  echo "⚠ Merge conflict detected. Please resolve conflicts in hero-section.tsx manually."
  exit 1
fi

echo "==> Run TypeScript check"
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "⚠ TypeScript errors detected. Fix before running dev."
  exit 1
fi

echo "==> Push merged main to origin"
git push origin main

# مدیریت پورت در صورت در حال اجرا بودنif [ -n "$PID" ]; then
  echo "==> Port $PORT is in use by PID $PID. Killing process..."
  kill -9 $PID
fi

echo "==> Start Next.js dev server"
npm run dev
