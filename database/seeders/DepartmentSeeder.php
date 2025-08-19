<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'dept_name' => 'Administration',
                'description' => 'General administrative functions and office management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Finance',
                'description' => 'Financial management, budgeting, and accounting',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Public Works',
                'description' => 'Infrastructure development and maintenance',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Water & Sanitation',
                'description' => 'Water supply and sanitation services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Engineering',
                'description' => 'Technical engineering and project management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Planning & Development',
                'description' => 'Urban planning and development control',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Health Services',
                'description' => 'Public health and environmental health',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Education',
                'description' => 'Educational facilities and services',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Security',
                'description' => 'Municipal security and law enforcement',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'dept_name' => 'Procurement',
                'description' => 'Procurement and supply chain management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('departments')->insert($departments);
    }
}
