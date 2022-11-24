@extends('layouts.app')

@section('title')
<title>Đăng nhập</title>
@stop

@section('content')
<section  class="login_container">
    <div class='login'>
        <div class='head'>
            <h1 class='company'>Địa điểm Y tế Cần thơ</h1>
        </div>
        <div class='form'>
            <form method="post">
            @csrf
                @if(Session::has('error'))
                    <p class="alert">{{Session::get('error')}}</p>
                @endif
                <input type="text" name="username" placeholder='Tài khoản' class='text' required><br>
                <input type="password" name="password" placeholder='••••••••••••••' class='password'required><br>
                <button type="submit" class='btn-login' id='do-login'>Đăng nhập</button>
                <a href="#" class='forgot'>Quên mật khẩu?</a>
            </form>
        </div>
    </div>  
</section>
@stop