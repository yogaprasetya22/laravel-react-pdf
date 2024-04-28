export PATH=/opt/homebrew/bin:$PATH
git reset --hard HEAD
git pull
php artisan optimize
php artisan migrate:fresh --seed