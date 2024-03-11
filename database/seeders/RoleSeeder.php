<?php

namespace Database\Seeders;

use App\Models\Prodi;
use App\Models\Role;
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
            [
                'name_role' => 'staf',
            ],
            [
                'name_role' => 'gh',
            ],
            [
                'name_role' => 'dh',
            ],
        ];

        // create data roles
        Role::insert($roles);

    }
}
