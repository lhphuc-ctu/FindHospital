<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [ 
                'name' => 'Le Hong Phuc',
                'username' => 'lhphuc',
                'role' => 'admin',
                'password' => bcrypt('123456aa')
            ],
            [ 
                'name' => 'Le Hong Phuc',
                'username' => 'phuc',
                'role' => 'user',
                'password' => bcrypt('123456aa')
            ]
            ];
            DB::table('users')->insert($data);
    }
}
