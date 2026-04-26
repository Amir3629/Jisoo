#!/bin/bash
cd /Users/amir/Downloads/b_qh75CM5TOI3

git add components/home/hero-section.tsx \
        components/layout/header.tsx \
        components/product/product-card.tsx \
        components/search/search-modal.tsx \
        next.config.mjs
git commit -m "Apply PR1 P0 fixes + Design11Hero"
git push origin main

npx tsc --noEmit

PORT=3000
PID=$(lsof -ti tcp:$PORT)
if [ -n "$PID" ]; then
  kill -9 $PID
fi

npm run dev
