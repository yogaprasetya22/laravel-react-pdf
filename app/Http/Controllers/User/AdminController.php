<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('admin/Admin', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }
}
