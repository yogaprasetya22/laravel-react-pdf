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

        User::create([
            'uuid' => str()->uuid(),
            'name' => 'client',
            'email' => 'client@gmail.com',
            'password' => bcrypt('asdasdasd'),
            'no_telp' => '08123456789',
            'alamat' => 'Jl. Raya',
            'role_id' => '2',
            'created_at' => now(),
        ]);

        for ($i = 0; $i < 15; $i++) {
            User::create([
                'uuid' => str()->uuid(),
                'name' => 'client' . $i,
                'email' => 'client' . $i . '@gmail.com',
                'password' => bcrypt('asdasdasd'),
                'no_telp' => $faker->phoneNumber,
                'alamat' => $faker->address,
                'role_id' => '2',
                'created_at' => now(),
            ]);
        }

        User::create([
            'uuid' => str()->uuid(),
            'name' => 'superadmin',
            'email' => 'superadmin@gmai.com',
            'password' => bcrypt('asdasdasd'),
            'no_telp' => '08123456789',
            'alamat' => 'Jl. Raya',
            'role_id' => '3',
            'created_at' => now(),
        ]);
    }
}
