<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GeoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//HomeController
Route::get('/', [HomeController::class, 'home']);
//AdminController
Route::get('/admin', [AdminController::class, 'home']);
//AuthController
Route::get('/login', [AuthController::class, 'login']);
Route::post('/login', [AuthController::class, 'authenticate']);
Route::get('/logout', [AuthController::class, 'logout']);
//GeoController
Route::get('/getGeo', [GeoController::class, 'getGeo']);
Route::post('/setGeo', [GeoController::class, 'setGeo']);
Route::post('/deleteGeo', [GeoController::class, 'deleteGeo']);