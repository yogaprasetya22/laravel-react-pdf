<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ClientUser;
use App\Models\Feedback;
use App\Models\Laporan;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClientController extends Controller
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
        ])->whereHas('user', function ($query) {
            $query->where('uuid', Auth::user()->uuid);
        })->latest()->get();
        return Inertia::render('client/Index', [
            'title' => 'User',
            'data' => $laporan,
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
        $tamplate = Template::first();
        return Inertia::render('client/Laporan', [
            'title' => 'Laporan',
            'tamplate' => $tamplate
        ]);
    }

    public function history()
    {
        $laporan = Laporan::with(['user', 'no_sprin', 'pertimbangan', 'dasar', 'kepada', 'no_sprin', 'untuk', 'surat_perintah', 'feedback.status'])->whereHas('user', function ($query) {
            $query->where('uuid', Auth::user()->uuid);
        })->latest()->get();
        return Inertia::render('client/History', [
            'title' => 'History',
            'data' => $laporan,
        ]);
    }

    public function history_detail($uuid)
    {
        $tamplate = Template::first();
        $laporan = Laporan::with(['user', 'no_sprin', 'pertimbangan', 'dasar', 'kepada', 'no_sprin', 'untuk', 'surat_perintah', 'feedback.status',])->where('uuid', $uuid)->first();
        return Inertia::render('client/DetailHistory', [
            'title' => 'History Detail',
            'data' => $laporan,
            'tamplate' => $tamplate
        ]);
    }
    public function feedback()
    {
        $laporan = Laporan::with(['user', 'no_sprin', 'pertimbangan', 'dasar', 'kepada', 'no_sprin', 'untuk', 'surat_perintah', 'feedback.status',])->whereHas('user', function ($query) {
            $query->where('uuid', Auth::user()->uuid);
        })->whereHas('feedback', function ($query) {
            $query->where('feedback', '!=', null);
        })->latest()->get();

        return Inertia::render('client/Feedback', [
            'title' => 'Feedback',
            'data' => $laporan,
        ]);
    }
    public function feedback_detail($uuid)
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
        ])->where('uuid', $uuid)->first();

        $user = ClientUser::with(['user.role'])->where('user_id', $laporan->user->id)->first();

        $result = collect([
            'nomor_sprin' => [
                'kode' => $laporan->no_sprin->kode,
                'unit' => $laporan->no_sprin->unit,
                'kategori' => $laporan->no_sprin->kategori,
                'tahun' => $laporan->no_sprin->tahun,
            ],
            'pertimbangan' => $laporan->pertimbangan->pertimbangan,
            'dasar' => collect($laporan->dasar)->pluck('dasar'),
            'kepada' => collect($laporan->kepada)->map(function ($item) {
                return [
                    'nama' => $item->nama,
                    'pangkat' => $item->pangkat,
                    'nrp' => $item->nrp,
                    'jabatan' => $item->jabatan,
                    'keterangan' => $item->keterangan,
                ];
            }),
            'untuk' => collect($laporan->untuk)->pluck('untuk'),
            'surat_perintah' => [
                'berlaku' => $laporan->surat_perintah->berlaku,
                'hingga' => $laporan->surat_perintah->hingga,
                'pangkat' => 'r'
            ],
            'user' => $user,
            'feedback' => $laporan->feedback
        ]);
        $tamplate = Template::first();
        return Inertia::render('client/DetailFeedback', [
            'title' => 'Feedback Detail',
            'data' => $result,
            'laporan' => $laporan,
            'tamplate' => $tamplate,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'no_telp' => 'required',
            'alamat' => 'required',
            'password' => 'required|min:6',
            'nrp' => 'required',
            'pangkat' => 'required',
            'jabatan' => 'required',
        ]);

        $user = User::create([
            'uuid' => str()->uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'no_telp' => $request->no_telp,
            'alamat' => $request->alamat,
            'password' => bcrypt($request->password),
            'role_id' => '2',
            'created_at' => now(),
        ]);

        $user->client()->create([
            'uuid' => str()->uuid(),
            'nrp' => $request->nrp,
            'pangkat' => $request->pangkat,
            'jabatan' => $request->jabatan,
        ]);

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     */
    public function search(Request $request)
    {
        $user = User::with(['role'])->where('role_id', 2)
            ->where('name', 'like', '%' . $request->search . '%')
            ->where('email', 'like', '%' . $request->search . '%')
            ->where('no_telp', 'like', '%' . $request->search . '%')
            ->where('alamat', 'like', '%' . $request->search . '%')
            ->latest()->get();
        return response()->json($user);
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
    public function update(Request $request): \Illuminate\Http\RedirectResponse
    {
        // update data user
        $request->validate([
            'uuid' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'no_telp' => 'required',
            'alamat' => 'required',
            'nrp' => 'required',
            'pangkat' => 'required',
            'jabatan' => 'required',
        ]);

        $user = User::where('uuid', $request->uuid)->first();
        if ($request->password) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'no_telp' => $request->no_telp,
                'alamat' => $request->alamat,
                'password' => bcrypt($request->password),
            ]);
            $user->client()->update([
                'nrp' => $request->nrp,
                'pangkat' => $request->pangkat,
                'jabatan' => $request->jabatan,
            ]);
        } else {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'no_telp' => $request->no_telp,
                'alamat' => $request->alamat,
            ]);
            $user->client()->update([
                'nrp' => $request->nrp,
                'pangkat' => $request->pangkat,
                'jabatan' => $request->jabatan,
            ]);
        }
        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): \Illuminate\Http\RedirectResponse
    {
        // delete data user
        $user = User::where('uuid', $request->uuid)->first();
        $user->delete();

        return Redirect::back();
    }
}
