<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $faker = \Faker\Factory::create('id_ID');

        $this->call([
            RoleSeeder::class,
        ]);

        User::create([
            'uuid' => str()->uuid(),
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'no_telp' => '08123456789',
            'alamat' => 'Jl. Raya',
            'role_id' => '1',
            'created_at' => now(),
        ]);

        $client =  User::create([
            'uuid' => str()->uuid(),
            'name' => 'client',
            'email' => 'client@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'no_telp' => '08123456789',
            'alamat' => 'Jl. Raya',
            'role_id' => '2',
            'created_at' => now(),
        ]);

        $client->client()->create([
            'uuid' => str()->uuid(),
            'nrp' => '12345678',
            'pangkat' => 'AKP',
            'jabatan' => 'Kapolsek',
        ]);

        $pangkat = ['AKP', 'IPTU', 'AIPTU', 'KOMPOL', 'AKBP', 'KOMBES', 'BRIGJEN', 'MUTASI', 'KOMBES', 'IRJEN'];
        $jabatan = ['Kapolsek', 'Kasat', 'Kapolres', 'Kanit Reginet', 'Kanit Reskrim', 'Kanit Lantas', 'Kanit Binmas', 'Kanit Intel', 'Kanit Narkoba', 'Kanit Sabhara'];
        $ganerate_nrp = function () use ($faker) {
            $nrp = $faker->randomNumber(8);
            return $nrp;
        };

        for ($i = 0; $i < 15; $i++) {
            $client =   User::create([
                'uuid' => str()->uuid(),
                'name' => 'client' . $i,
                'email' => 'client' . $i . '@gmail.com',
                'password' => bcrypt('asdasdasd'),
                'no_telp' => $faker->phoneNumber,
                'alamat' => $faker->address,
                'role_id' => '2',
                'created_at' => now(),
            ]);

            $client->client()->create([
                'uuid' => str()->uuid(),
                'nrp' => $ganerate_nrp(),
                'pangkat' => $pangkat[rand(0, 9)],
                'jabatan' => $jabatan[rand(0, 9)],
            ]);
        }

        User::create([
            'uuid' => str()->uuid(),
            'name' => 'superadmin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'no_telp' => '08123456789',
            'alamat' => 'Jl. Raya',
            'role_id' => '3',
            'created_at' => now(),
        ]);
    }
}
