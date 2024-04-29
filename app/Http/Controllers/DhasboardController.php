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
        $faker = \Faker\Factory::create('id_ID');
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
                    "tugas" => "ANJAK PERTAMA BID BAG SUMDA POLRES BOGOR",
                    "nama" => "SUHARTO, S.E, M.SI.",
                    "nrp" => "63030721",
                    "pangkat" => "KOMPOL",
                ],
                [
                    "jabatan" => "LETNAN",
                    "tugas" => "KAPOLSEK PARUNG PANJANG POLRES BOGOR",
                    "nama" => "Drs. NUNDUN RADIAMAN",
                    "nrp" => "65100031",
                    "pangkat" => "KOMPOL",
                ],
                [
                    "jabatan" => "LETNAN",
                    "tugas" => "KAPOLSEK PARUNG PANJANG POLRES BOGOR",
                    "nama" => "Drs. NUNDUN RADIAMAN",
                    "nrp" => "65100031",
                    "pangkat" => "KOMPOL",
                ],
                [
                    "jabatan" => "LETNAN",
                    "tugas" => "KAPOLSEK PARUNG PANJANG POLRES BOGOR",
                    "nama" => "Drs. NUNDUN RADIAMAN",
                    "nrp" => "65100031",
                    "pangkat" => "KOMPOL",
                ],
                [
                    "jabatan" => "LETNAN",
                    "tugas" => "KAPOLSEK PARUNG PANJANG POLRES BOGOR",
                    "nama" => "Drs. NUNDUN RADIAMAN",
                    "nrp" => "65100031",
                    "pangkat" => "KOMPOL",
                ],
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
            "lampiran" => "lampiran sprin pelaksanaan tugas survey kepuasan masyarakat, kotak sarapan, petugas pegaduhan offline / online dan ikm digital"
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
        $op = ['NRP', 'NIP'];
        $random_op = $op[rand(0, 1)];
        $pangkat = ['AKP', 'IPTU', 'AIPTU', 'KOMPOL', 'AKBP', 'KOMBES', 'BRIGJEN', 'MUTASI', 'KOMBES', 'IRJEN'];
        $jabatan = ['Kapolsek', 'Kasat', 'Kapolres', 'Kanit Reginet', 'Kanit Reskrim', 'Kanit Lantas', 'Kanit Binmas', 'Kanit Intel', 'Kanit Narkoba', 'Kanit Sabhara'];
        $ganerate_nrp = function () use ($faker) {
            $nrp = $faker->randomNumber(6);
            return $nrp;
        };
        $ganerate_nip = function () use ($faker) {
            $nip = '19' . $faker->randomNumber(8) . $faker->randomNumber(6);
            return $nip;
        };

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
                'lampiran' => $data_dummy['lampiran'],
                'created_at' => $now->copy()->subDays(rand(1, 15))->format('Y-m-d'),
            ]);

            $laporan->feedback()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'feedback' => $faker->sentence,
                'status_id' => rand(1, 3),
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
                    'nama' => $faker->name,
                    'pangkat' => $pangkat[rand(0, 9)],
                    'picked' => $random_op,
                    'nrp' => $random_op == 'NRP' ? $ganerate_nrp() : $ganerate_nip(),
                    'jabatan' => $jabatan[rand(0, 9)],
                    'tugas' => $kepada['tugas'],
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
                'berlaku' => $now->copy()->subDays(rand(1, 15))->format('Y-m-d'),
                'hingga' => $now->copy()->subDays(rand(1, 15))->format('Y-m-d'),
            ]);
        }

        foreach ($data as $key => $value) {
            $laporan = Laporan::create([
                'uuid' => str()->uuid(),
                'user_id' => $value['user']['id'],
                'uuid_user' => $value['user']['uuid'],
                'lampiran' => $data_dummy['lampiran'],
                'created_at' => $now->copy()->addDays(rand(1, 15))->format('Y-m-d'),
            ]);

            $laporan->feedback()->create([
                'uuid' => str()->uuid(),
                'laporan_uuid' => $laporan->uuid,
                'feedback' => $faker->sentence,
                'status_id' => rand(1, 3),
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
                    'nama' => $faker->name,
                    'pangkat' => $pangkat[rand(0, 9)],
                    'picked' => $random_op,
                    'nrp' => $random_op == 'NRP' ? $ganerate_nrp() : $ganerate_nip(),
                    'jabatan' => $jabatan[rand(0, 9)],
                    'tugas' => $kepada['tugas'],
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
                'berlaku' => $now->copy()->addDays(rand(1, 15))->format('Y-m-d'),
                'hingga' => $now->copy()->addDays(rand(1, 15))->format('Y-m-d'),
            ]);
        }

        return response()->json([
            'count' => count($data),
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
