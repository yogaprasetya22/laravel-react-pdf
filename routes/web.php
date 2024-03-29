<?php

use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/fail404', function () {
    return Inertia::render('404', [
        'title' => '404',
    ]);
})->name('fail404');


Route::prefix('/')->middleware(['auth', 'role:2', 'verified'])->group(function () {
    Route::get('/', [Client::class, 'index'])->name('client');
    Route::post('/post/laporan', [Client::class, 'store'])->name('post.laporan');
    Route::get('/render/pdf', [Client::class, 'render'])->name('render.pdf');
});

Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    // Route::post('/user/search', [TableUserController::class, 'search'])->name('search');
    // Route::delete('/mahasiswa/{user}', [TableUserController::class, 'destroy'])->name('destroy');
    // Route::get('/data/{slug}', [AdminController::class, 'getData'])->name('getData');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
