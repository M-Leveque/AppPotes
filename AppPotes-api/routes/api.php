<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes for api auth
Route::post('login',[ 'as' => 'login', 'uses' => 'Auth\LoginController@login']);
Route::post('register', 'Auth\RegisterController@create');

// Routes for Photos controller
Route::resource('photos','PhotoController');
Route::get('/photos/byAlbum/{id}', 'PhotoController@showByAlbum');

// Routes for Album controller
Route::resource('albums','AlbumController');

// Routes for User controller
Route::resource('user','UserController');