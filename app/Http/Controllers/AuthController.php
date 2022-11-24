<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    
    public function login(){
        return view('auth.signin');
    }

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'username' => 'required', 'password' => 'required',
        ]);

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials))
        {
            
            return redirect()->intended('/admin');
        }

        return back()->withInput()->with('error', 'Tài khoản hoặc mật khẩu chưa đúng');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->intended('/');
    }
}
