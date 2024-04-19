#!/bin/bash

# Menjalankan perintah php artisan serve di tab baru
osascript -e 'tell application "Terminal" to do script "php artisan serve"'

# Menjalankan perintah npm run dev di tab baru
osascript -e 'tell application "Terminal" to do script "npm run dev"'

