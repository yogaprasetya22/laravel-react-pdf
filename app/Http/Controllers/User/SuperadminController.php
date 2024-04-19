<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperadminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $laporan = Laporan::with([
            'user',
            'no_sprin',
            'pertimbangan',
            'dasar',
            'kepada',
            'untuk',
            'surat_perintah',
            'feedback.status',
        ])->latest()->get();

        return Inertia::render('superadmin/Index', [
            'title' => 'Super Admin',
            'data' => $laporan,
        ]);
    }

    public function client()
    {
        $user = User::with(['role'])->where('role_id', 2)->latest()->get();
        return Inertia::render('superadmin/User', [
            'title' => 'Create User',
            'data' => $user
        ]);
    }

    public function admin()
    {
        $user = User::with(['role'])->where('role_id', 1)->latest()->get();
        return Inertia::render('superadmin/Admin', [
            'title' => 'Create Admin',
            'data' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
