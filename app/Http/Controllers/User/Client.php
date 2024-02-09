<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Client extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('client/Index', [
            'title' => 'User',
            'data' => $user,
        ]);
    }
    public function render()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('client/render/Index', [
            'title' => 'Render',
            'data' => $user,
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
        $file = $request->file('file');
        $fileName = $request->fileName; // Mendapatkan nama file yang diinginkan dari React

        // Simpan file blob ke direktori public/laporan dengan nama yang diinginkan
        $file->storeAs('public/laporan', $fileName);

        // Kembalikan respons JSON
        return response()->json([
            'message' => 'Laporan berhasil di kirim'
        ], 200);
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
