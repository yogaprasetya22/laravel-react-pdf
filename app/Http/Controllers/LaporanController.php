<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
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
    public function store(Request $request): \Illuminate\Http\RedirectResponse
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
                'nrp' => $kepada['nrp'],
                'jabatan' => $kepada['jabatan'],
                'keterangan' => $kepada['keterangan'],
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
    public function update(Request $request, string $uuid)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
