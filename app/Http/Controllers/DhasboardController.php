<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\user;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DhasboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $now = Carbon::now();
        $data_dummy = [
            "dasar" => [
                [
                    "dasar" => "Perintah lisan Kapolres Bogor hari Sabtu, tanggal 16 Mei 2020",
                ],
                [
                    "dasar" => "Keputusan Kapolri Nomor: Kep/849/IX/2015 tanggal 30 September 2015 tentang status jabatan dilingkungan Kepolisian Negara Republik Indonesia",
                ]
            ],
            "kepada" => [
                [
                    "jabatan" => "LETNAN",
                    "keterangan" => "ANJAK PERTAMA BID BAG SUMDA POLRES BOGOR",
                    "nama" => "SUHARTO, S.E, M.SI.",
                    "nrp" => "63030721",
                    "pangkat" => "KOMPOL",
                ],
                [
                    "jabatan" => "LETNAN",
                    "keterangan" => "KAPOLSEK PARUNG PANJANG POLRES BOGOR",
                    "nama" => "Drs. NUNDUN RADIAMAN",
                    "nrp" => "65100031",
                    "pangkat" => "KOMPOL",
                ]
            ],
            "no_sprin" => [
                "kategori" => "DWA.1.2",
                "kode" => "001",
                "tahun" => "2024",
                "unit" => "VI",
            ],
            "pertimbangan" => [
                "pertimbangan" => "bahwa dalam rangka kepentingan dinas Kepolisian Resor Jakarta, maka dipandang perlu untuk mengeluarkan Surat Perintah ini.",
            ],
            "surat_perintah" => [
                "berlaku" => "2024-04-18",
                "hingga" => "2024-04-30",
            ],
            "untuk" => [
                [
                    "untuk" => "tersebut nomor urut satu dibebaskan dari tugas dan Bogor (dalam rangka riksa Si Propam Polres Bogor)"
                ]
            ],
        ];

        $user = user::with(['role'])->where('role_id', 2)->latest()->get();
        $kategori = [
            'DWA',
            'KKA',
            'AWF',
            'KWA',
            'KIB',
            'AFC',
        ];

        $romawi = [
            'I',
            'II',
            'III',
            'IV',
            'V',
            'VI',
            'VII',
            'VIII',
            'IX',
            'X',
        ];

        $data = [];
        $index = 1;
        foreach ($user as $key => $value) {
            for ($i = 0; $i < 5; $i++) {
                $data[] = [
                    "dasar" => $data_dummy['dasar'],
                    "kepada" => $data_dummy['kepada'],
                    "no_sprin" => $data_dummy['no_sprin'],
                    "pertimbangan" => $data_dummy['pertimbangan'],
                    "surat_perintah" => $data_dummy['surat_perintah'],
                    "untuk" => $data_dummy['untuk'],
                    "user" => $value,

                ];
            }
        }

        foreach ($data as $key => $value) {
            $laporan = Laporan::create([
                'uuid' => str()->uuid(),
                'user_id' => $value['user']['id'],
                'uuid_user' => $value['user']['uuid'],
                'created_at' => now(),
            ]);

            $laporan->no_sprin()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'kode' => sprintf("%03d", $index++),
                'kategori' => $kategori[rand(0, 5)],
                'tahun' => rand(2020, 2024),
                'unit' => $romawi[rand(0, 9)],
            ]);

            $laporan->pertimbangan()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'pertimbangan' => $value['pertimbangan']['pertimbangan'],
            ]);

            foreach ($value['dasar'] as $dasar) {
                $laporan->dasar()->create([
                    'uuid' => str()->uuid(),
                    'laporan_uuid' => $laporan->uuid,
                    'dasar' => $dasar['dasar'],
                ]);
            }

            foreach ($value['kepada'] as $kepada) {
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

            foreach ($value['untuk'] as $untuk) {
                $laporan->untuk()->create([
                    'uuid' => str()->uuid(),
                    'laporan_uuid' => $laporan->uuid,
                    'untuk' => $untuk['untuk'],
                ]);
            }

            $laporan->surat_perintah()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'berlaku' => $now->copy()->format('Y-m-d'),
                'hingga' => $now->copy()->addDays(rand(1, 15))->format('Y-m-d'),
            ]);
        }


        return response()->json([
            'count' => count($data),
            'data' => $data,
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
    public function show(user $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
