<?php

use Illuminate\Database\Seeder;
use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin=User::create([
            'name' => 'Sebastian Ibarra',
            'email' => 'xebaelvemgador@gmail.com',
            'password' => bcrypt('Sterek64')
        ]);
        $admin->assignRole('admin');


    }
}
