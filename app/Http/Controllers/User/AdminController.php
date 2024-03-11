<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('admin/Index', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }

    public function aproval()
    {
        $laporan = Laporan::with(['user'])->latest()->get();
        return Inertia::render('admin/Aproval', [
            'title' => 'Aproval',
            'data' => $laporan,
        ]);
    }
}
