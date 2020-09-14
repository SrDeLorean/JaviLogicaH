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
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'role' => 'admin',
            'password' => bcrypt('123456')
        ]);
        $admin->assignRole('admin');

        $hotel=User::create([
            'name' => 'hotel',
            'email' => 'hotel@gmail.com',
            'role' => 'hotel',
            'password' => bcrypt('123456')
        ]);
        $hotel->assignRole('hotel');

        $tour=User::create([
            'name' => 'tour',
            'email' => 'tour@gmail.com',
            'role' => 'tour',
            'password' => bcrypt('123456')
        ]);
        $tour->assignRole('tour');

        $user=User::create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'role' => 'user',
            'password' => bcrypt('123456')
        ]);
        $user->assignRole('user');


    }
}
