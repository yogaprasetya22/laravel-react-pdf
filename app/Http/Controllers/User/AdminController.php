<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ClientUser;
use App\Models\Feedback;
use App\Models\Laporan;
use App\Models\Status;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Mockery\Matcher\Any;

class AdminController extends Controller
{
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
        ])->whereHas('feedback', function ($query) {
            $query->where('status_id', 2);
        })->latest()->get();

        return Inertia::render('admin/Index', [
            'title' => 'Admin',
            'data' => $laporan,
        ]);
    }
    public function detail_dashboard($uuid)
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
                    'tugas' => $item->tugas,
                ];
            }),
            'untuk' => collect($laporan->untuk)->pluck('untuk'),
            'surat_perintah' => [
                'berlaku' => $laporan->surat_perintah->berlaku,
                'hingga' => $laporan->surat_perintah->hingga,
            ],
            'user' => $user,
            'feedback' => $laporan?->feedback,
            'lampiran' => $laporan?->lampiran,
        ]);

        $tamplate = Template::first();

        return Inertia::render('admin/DetailDashboard', [
            'title' => 'Admin Dahsboard',
            'data' => $result,
            'tamplate' => $tamplate,
        ]);
    }

    public function aproval()
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
        return Inertia::render('admin/Aproval', [
            'title' => 'Aproval',
            'data' => $laporan,
        ]);
    }

    public function detail_aproval($uuid)
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
                    'tugas' => $item->tugas,
                ];
            }),
            'untuk' => collect($laporan->untuk)->pluck('untuk'),
            'surat_perintah' => [
                'berlaku' => $laporan->surat_perintah->berlaku,
                'hingga' => $laporan->surat_perintah->hingga,
            ],
            'user' =>   $user,
            'feedback' => $laporan?->feedback,
            'lampiran' => $laporan?->lampiran,
        ]);

        $tamplate = Template::first();
        $status = Status::all();
        return Inertia::render('admin/DetailAproval', [
            'title' => 'Detail Aproval',
            'data' => $result,
            'laporan' => $laporan,
            'tamplate' => $tamplate,
            'status' => $status,
        ]);
    }

    public function aproval_post(Request $request): \Illuminate\Http\RedirectResponse
    {
        $feedback = Feedback::with(['laporan'])->where('laporan_uuid', $request->laporan_uuid)->first();
        if ($feedback) {
            $feedback->update([
                'feedback' => $request->feedback,
                'status_id' => $request->status_id
            ]);
        } else {
            Feedback::create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $request->laporan_uuid,
                'feedback' => $request->feedback,
                'status_id' => $request->status_id
            ]);
        }

        return Redirect::route('admin.aproval');
    }

    public function update_aproval($uuid)
    {
        $tamplate = Template::first();
        $laporan = Laporan::with(['user', 'no_sprin', 'pertimbangan', 'dasar', 'kepada', 'no_sprin', 'untuk', 'surat_perintah', 'feedback.status',])->where('uuid', $uuid)->first();
        return Inertia::render('admin/UpdateAproval', [
            'title' => 'Update Aproval',
            'data' => $laporan,
            'tamplate' => $tamplate
        ]);
    }

    public function user()
    {
        $user = ClientUser::with(['user.role'])->whereHas('user', function ($query) {
            $query->where('role_id', 2);
        })->get();
        return Inertia::render('admin/User', [
            'title' => 'User',
            'data' => $user,
        ]);
    }

    public function tamplate()
    {
        $tamplate = Template::first();
        return Inertia::render('admin/Tamplate', [
            'title' => 'Tamplate',
            'data' => $tamplate,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        // create data user

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'no_telp' => 'required',
            'alamat' => 'required',
            'password' => 'required|min:6',
        ]);

        User::create([
            'uuid' => str()->uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'no_telp' => $request->no_telp,
            'alamat' => $request->alamat,
            'password' => bcrypt($request->password),
            'role_id' => '1'
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
        } else {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'no_telp' => $request->no_telp,
                'alamat' => $request->alamat,
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
