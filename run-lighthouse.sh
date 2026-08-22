#!/usr/bin/env bash
set -euo pipefail
cd /home/ubuntu/crest-automotive-astro
mkdir -p lighthouse-reports
base="http://localhost:4321"
routes=("/" "/services" "/estimate" "/terms-of-service")
for route in "${routes[@]}"; do
  slug="${route#/}"
  [[ -z "$slug" ]] && slug="home"
  pnpm dlx lighthouse "${base}${route}" \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json \
    --output-path="lighthouse-reports/${slug}-mobile.json" \
    --quiet \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu"
  pnpm dlx lighthouse "${base}${route}" \
    --preset=desktop \
    --only-categories=performance,accessibility,best-practices,seo \
    --output=json \
    --output-path="lighthouse-reports/${slug}-desktop.json" \
    --quiet \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu"
done
