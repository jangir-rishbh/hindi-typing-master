@echo off
set NODE_OPTIONS=--max-old-space-size=8192
set NEXT_TELEMETRY_DISABLED=1
set NODE_ENV=production
set CI=true
npm run build
