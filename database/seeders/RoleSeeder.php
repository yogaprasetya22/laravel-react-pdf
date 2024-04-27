<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\Role;
use App\Models\Status;
use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $roles = [
            [
                'name_role' => 'admin',
            ],
            [
                'name_role' => 'client',
            ],
        ];

        // create data roles
        Role::insert($roles);

        // create status
        $status = [
            [
                'name_status' => 'tertunda',
            ],
            [
                'name_status' => 'disetujui',
            ],
            [
                'name_status' => 'ditolak',
            ],
        ];

        // create data status
        Status::insert($status);

        // create tamplate
        $tamplate = [
            "title" => "kepolisian negara republik indonesia daerah jawa barat",
            "polres" => "Restor Jakarta",
            "tujuan_laporan" => "Kasat Lantas",
            "dikeluarkan" => "Restor Jakarta",
            "nama_unit" => "kepala kepolisian restor jakarta",
            "pemimpin_unit" => "LUTFI ABDUL AZIS",
            "nrp_pemimpin_unit" => "123456789",
            "tembusan_1" => "Kapolres Jakarta",
            "tembusan_2" => "Kabag Ops Polres Jakarta",
            "tembusan_3" => "Kasi Propam Polres Jakarta",
            // "lampiran" => "LAMPIRAN SPRIN PELAKSAAN TUGAS SERVEY KEPUASAN MASYARAKAT, KOTAK SARAPAN, PETUGAS PENGADUAN OFFLINE/ONLINE DAN IKM DIGITAL",
        ];

        // create data tamplate
        Template::create($tamplate);
    }
}
