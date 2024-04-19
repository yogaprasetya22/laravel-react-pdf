export PATH=/opt/homebrew/bin:$PATH
composer install && npm i --legacy-peer-deps
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed