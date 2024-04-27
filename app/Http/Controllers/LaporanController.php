<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\NoSprin;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request): \Illuminate\Http\RedirectResponse | \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'nomor_sprin' => 'required',
            'pertimbangan' => 'required',
            'dasar' => 'required',
            'kepada' => 'required',
            'untuk' => 'required',
            'surat_perintah' => 'required',
            'uuid' => 'required',
        ]);

        // buatkan validasi jika kode unit kategori tahun semuanya sama maka akan retrun data sudah ada
        $empty_spri = NoSprin::where('kode', $request->nomor_sprin['kode'])
            ->where('unit', $request->nomor_sprin['unit'])
            ->where('kategori', $request->nomor_sprin['kategori'])
            ->where('tahun', $request->nomor_sprin['tahun'])
            ->first();

        if ($empty_spri) {
            // return Redirect::back();
            return response()->json([
                'message' => 'Data sudah ada',
            ])->setStatusCode(400);
        }

        $laporan = Laporan::create([
            'uuid' => str()->uuid(),
            'user_id' => auth()->id(),
            'uuid_user' => auth()->user()->uuid,
            'created_at' => now(),
        ]);

        $laporan->no_sprin()->create([
            'uuid' => str()->uuid(),
            'laporan_uuid' => $laporan->uuid,
            'kode' => $request->nomor_sprin['kode'], // Akses elemen kode dari array
            'unit' => $request->nomor_sprin['unit'], // Akses elemen unit dari array
            'kategori' => $request->nomor_sprin['kategori'], // Akses elemen kategori dari array
            'tahun' => $request->nomor_sprin['tahun'], // Akses elemen tahun dari array
        ]);


        $laporan->pertimbangan()->create([
            'uuid' => str()->uuid(),
            'laporan_uuid' => $laporan->uuid,
            'pertimbangan' => $request->pertimbangan,
        ]);

        foreach ($request->dasar as $dasar) {
            $laporan->dasar()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'dasar' => $dasar,
            ]);
        }

        foreach ($request->kepada as $kepada) {
            $laporan->kepada()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'nama' => $kepada['nama'],
                'pangkat' => $kepada['pangkat'],
                'picked' => $kepada['picked'],
                'nrp' => $kepada['nrp'],
                'jabatan' => $kepada['jabatan'],
                'tugas' => $kepada['tugas'],
            ]);
        }

        foreach ($request->untuk as $untuk) {
            $laporan->untuk()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'untuk' => $untuk,
            ]);
        }

        $laporan->surat_perintah()->create([
            'uuid' => str()->uuid(),
            'laporan_uuid' => $laporan->uuid,
            'berlaku' => $request->surat_perintah['berlaku'],
            'hingga' => $request->surat_perintah['hingga'],
        ]);


        return Redirect::back();
    }


    public function store_tamplate(Request $request): \Illuminate\Http\RedirectResponse
    {
        // create a new laporan
        $request->validate([
            'title' => 'required',
            'polres' => 'required',
            'tujuan_laporan' => 'required',
            'dikeluarkan' => 'required',
            'nama_unit' => 'required',
            'pemimpin_unit' => 'required',
            'nrp_pemimpin_unit' => 'required',
            'tembusan_1' => 'required',
            'tembusan_2' => 'required',
            'tembusan_3' => 'required',
        ]);

        $laporan_exists = Template::first();

        if ($laporan_exists) {
            $laporan_exists->update([
                "title" => $request->title,
                "polres" => $request->polres,
                "tujuan_laporan" => $request->tujuan_laporan,
                "dikeluarkan" => $request->dikeluarkan,
                "nama_unit" => $request->nama_unit,
                "pemimpin_unit" => $request->pemimpin_unit,
                "nrp_pemimpin_unit" => $request->nrp_pemimpin_unit,
                "tembusan_1" => $request->tembusan_1,
                "tembusan_2" => $request->tembusan_2,
                "tembusan_3" => $request->tembusan_3,
            ]);
        } else {
            Template::create([
                "title" => $request->title,
                "polres" => $request->polres,
                "tujuan_laporan" => $request->tujuan_laporan,
                "dikeluarkan" => $request->dikeluarkan,
                "nama_unit" => $request->nama_unit,
                "pemimpin_unit" => $request->pemimpin_unit,
                "nrp_pemimpin_unit" => $request->nrp_pemimpin_unit,
                "tembusan_1" => $request->tembusan_1,
                "tembusan_2" => $request->tembusan_2,
                "tembusan_3" => $request->tembusan_3,
            ]);
        };

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     */
    public function search(Request $request)
    {
        $laporan = Laporan::with(['user', 'no_sprin', 'pertimbangan', 'dasar', 'kepada', 'untuk', 'surat_perintah'])
            ->where('uuid', $request->search)
            ->orWhere('uuid_user', $request->search)
            ->orWhereHas('no_sprin', function ($query) use ($request) {
                $query->where('kode', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('pertimbangan', function ($query) use ($request) {
                $query->where('pertimbangan', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('dasar', function ($query) use ($request) {
                $query->where('dasar', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('kepada', function ($query) use ($request) {
                $query->where('nama', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('untuk', function ($query) use ($request) {
                $query->where('untuk', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('surat_perintah', function ($query) use ($request) {
                $query->where('berlaku', 'like', '%' . $request->search . '%');
            })
            ->orWhereHas('surat_perintah', function ($query) use ($request) {
                $query->where('hingga', 'like', '%' . $request->search . '%');
            })
            ->get();

        return response()->json($laporan);
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
        // update data laporan
        $request->validate([
            'uuid' => 'required',
            'nomor_sprin' => 'required',
            'pertimbangan' => 'required',
            'dasar' => 'required',
            'kepada' => 'required',
            'untuk' => 'required',
            'surat_perintah' => 'required',
        ]);

        $laporan = Laporan::where('uuid', $request->uuid)->first();

        $laporan->pertimbangan()->update([
            'pertimbangan' => $request->pertimbangan,
        ]);

        $laporan->dasar()->delete();
        foreach ($request->dasar as $dasar) {
            $laporan->dasar()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'dasar' => $dasar,
            ]);
        }

        $laporan->kepada()->delete();
        foreach ($request->kepada as $kepada) {
            $laporan->kepada()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'nama' => $kepada['nama'],
                'pangkat' => $kepada['pangkat'],
                'picked' => $kepada['picked'],
                'nrp' => $kepada['nrp'],
                'jabatan' => $kepada['jabatan'],
                'tugas' => $kepada['tugas'],
            ]);
        }

        $laporan->untuk()->delete();
        foreach ($request->untuk as $untuk) {
            $laporan->untuk()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'untuk' => $untuk,
            ]);
        }

        $laporan->surat_perintah()->update([
            'berlaku' => $request->surat_perintah['berlaku'],
            'hingga' => $request->surat_perintah['hingga'],
        ]);

        return Redirect::back();
    }

    /**
     * Aproval
     */
    public function aproval(Request $request, string $uuid)
    {
        // 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): \Illuminate\Http\RedirectResponse
    {
        $laporan = Laporan::where('uuid', $request->uuid)->first();
        $laporan->no_sprin()->delete();
        $laporan->pertimbangan()->delete();
        $laporan->dasar()->delete();
        $laporan->kepada()->delete();
        $laporan->untuk()->delete();
        $laporan->surat_perintah()->delete();
        $laporan->delete();

        return Redirect::back();
    }
}
