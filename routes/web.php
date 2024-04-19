<?php

use App\Http\Controllers\LaporanController;
use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ClientController;
use App\Http\Controllers\user\SuperadminController;
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
    Route::get('/', [ClientController::class, 'index'])->name('ClientController');
    Route::get('/laporan', [ClientController::class, 'laporan'])->name('client.laporan');
    Route::get('/history', [ClientController::class, 'history'])->name('client.history');
    Route::get('/history/{uuid}', [ClientController::class, 'history_detail'])->name('client.history_detail');
    Route::get('/feedback', [ClientController::class, 'feedback'])->name('client.feedback');
    Route::get('/feedback/{uuid}', [ClientController::class, 'feedback_detail'])->name('client.feedback_detail');
    Route::get('/render/pdf', [ClientController::class, 'render'])->name('render.pdf');
    Route::resource('laporan', LaporanController::class)->only(['store', 'destroy']);
});

Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    Route::get('/aproval', [AdminController::class, 'aproval'])->name('admin.aproval');
    Route::post('/aproval', [AdminController::class, 'aproval_post'])->name('admin.aproval.post');
    Route::get('/aproval/{uuid}', [AdminController::class, 'detail_aproval'])->name('admin.detail_aproval');
    // user
    Route::get('/user', [AdminController::class, 'user'])->name('admin.user');
    Route::post('/user', [ClientController::class, 'store'])->name('admin.user.store');
    Route::put('/user', [ClientController::class, 'update'])->name('admin.user.update');
    Route::delete('/user', [ClientController::class, 'destroy'])->name('admin.user.destroy');
    // tamplate
    Route::get('/tamplate', [AdminController::class, 'tamplate'])->name('admin.tamplate');
    Route::post('/tamplate', [LaporanController::class, 'store_tamplate'])->name('admin.store_tamplate');
});

Route::prefix('superadmin')->middleware(['auth', 'role:3', 'verified'])->group(function () {
    Route::get('/', [SuperadminController::class, 'index'])->name('superadmin');
    Route::get('/client', [SuperadminController::class, 'client'])->name('superadmin.client');
    Route::get('/admin', [SuperadminController::class, 'admin'])->name('superadmin.admin');
    Route::post('/admin', [AdminController::class, 'store'])->name('superadmin.admin.store');
    Route::put('/admin', [AdminController::class, 'update'])->name('superadmin.admin.update');
    Route::delete('/admin', [AdminController::class, 'destroy'])->name('superadmin.admin.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
