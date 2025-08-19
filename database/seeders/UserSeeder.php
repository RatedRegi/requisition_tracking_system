<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'admin',
                'name' => 'System Administrator',
                'email' => 'admin@shurugwi.gov.zw',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'dept_id' => 1, // Administration
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'finance_head',
                'name' => 'Finance Department Head',
                'email' => 'finance@shurugwi.gov.zw',
                'password' => Hash::make('finance123'),
                'role' => 'approver',
                'dept_id' => 2, // Finance
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'procurement_officer',
                'name' => 'Procurement Officer',
                'email' => 'procurement@shurugwi.gov.zw',
                'password' => Hash::make('procurement123'),
                'role' => 'procurement',
                'dept_id' => 10, // Procurement
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'public_works_staff',
                'name' => 'Public Works Staff',
                'email' => 'publicworks@shurugwi.gov.zw',
                'password' => Hash::make('works123'),
                'role' => 'requester',
                'dept_id' => 3, // Public Works
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'water_sanitation_staff',
                'name' => 'Water & Sanitation Staff',
                'email' => 'water@shurugwi.gov.zw',
                'password' => Hash::make('water123'),
                'role' => 'requester',
                'dept_id' => 4, // Water & Sanitation
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('users')->insert($users);
    }
}
