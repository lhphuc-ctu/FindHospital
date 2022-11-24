<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function home()
    {
        if (Auth::check()){
            $user = Auth::user();
            if ($user->role == "admin")
                return view("admin.index");
            else{
                return redirect('/');
            }
        }
        else {
            return redirect('/login')->with('error', 'Vui lòng đăng nhập vào hệ thống!');;
        }
    }
}
