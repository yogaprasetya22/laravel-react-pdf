#!/bin/bash

# Menjalankan perintah composer PATH
osascript -e 'tell application "Terminal" to do script "export PATH=/opt/homebrew/bin:$PATH"'

# Menjalankan perintah pull
osascript -e 'tell application "Terminal" to do script "git pull"'

# Menyalin file .env.example menjadi .env
osascript -e 'tell application "Terminal" to do script "cp .env.example .env"'

# Menjalankan perintah php artisan key:generate
osascript -e 'tell application "Terminal" to do script "php artisan key:generate"'

# Menjalankan perintah php artisan serve di tab baru
osascript -e 'tell application "Terminal" to do script "php artisan serve"'

# Menjalankan perintah npm run dev di tab baru
osascript -e 'tell application "Terminal" to do script "npm run dev"'

