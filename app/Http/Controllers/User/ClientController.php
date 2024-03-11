<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
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

    public function laporan()
    {
        return Inertia::render('client/Laporan', [
            'title' => 'Laporan',
        ]);
    }

    public function history()
    {
        $laporan = Laporan::with(['user'])->latest()->get();
        return Inertia::render('client/History', [
            'title' => 'History',
            'data' => $laporan,
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
        $uuid = str()->uuid();
        $fileName = 'laporan-' . $request->uuid . '.' . $file->extension();
        // Simpan file blob ke direktori public/laporan/{tanggal} dengan nama file yang diinginkan
        $storage = $file->storeAs('public/laporan/' . $uuid, $fileName);
        if ($storage) {
            Laporan::create([
                'uuid' => $uuid,
                'user_id' => Auth()->user()->id,
                'uuid_user' => $request->uuid,
                'file' => $fileName
            ]);
        }

        return redirect()->back();
        // return response()->json($fileName);
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
