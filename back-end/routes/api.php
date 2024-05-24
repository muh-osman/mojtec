<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\IphoneController;
use App\Http\Controllers\RepairServiceController;
use App\Http\Controllers\ServicePriceController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\OrderController;



// Group for protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Return the authenticated user and his token (http://localhost:8000/api/user)
    Route::get('user', function (Request $request) {
        return [
            'user' => $request->user(),
            'currentToken' => $request->bearerToken()
        ];
    });

    // Logout Route (http://localhost:8000/api/logout)
    Route::post('/logout', [UserController::class, 'logout']);


    // Resend verification email (http://localhost:8000/api/resend-verify-email)
    Route::post('/resend-verify-email', [UserController::class, 'resendVerifyEmail']);
});


// Group for guest routes
Route::middleware('guest')->group(function () {
    // Register Route (http://localhost:8000/api/register)
    Route::post('/register', [UserController::class, 'register']);

    // Login Route (http://localhost:8000/api/login)
    Route::post('/login', [UserController::class, 'login']);

    // Email verification endpoint (http://localhost:8000/api/verify-email)
    Route::post('/verify-email', [UserController::class, 'verifyEmail'])->name('verification.verify');

    // Password Reset Route (http://localhost:8000/api/forgot-password)
    Route::post('/forgot-password', [UserController::class, 'forgotPassword'])->name('password.email');

    // API route for resetting the password (http://localhost:8000/api/reset-password)
    Route::post('/reset-password', [UserController::class, 'resetPassword'])->name('password.reset');
});







// Show all posts:      method GET    =>  http://localhost:8000/api/posts
// Create post:         method POST   =>  http://localhost:8000/api/posts
// Show post by id:     method GET    =>  http://localhost:8000/api/posts/1
// Update post by id:   method POST   =>  http://localhost:8000/api/posts/1?_method=PATCH
// Delete post by id:   method DELETE =>  http://localhost:8000/api/posts/1
Route::apiResource('posts', PostController::class);



// Routes for iPhone models
Route::apiResource('iphones', IphoneController::class);

// Add one new device with all its repair prices
Route::post('iphone-with-services-prices', [IphoneController::class, 'storeWithServices']);

// Delete iphone with all prices that related with it
Route::post('iphones', [IphoneController::class, 'destroy']);

// Routes for repair services
Route::apiResource('repair-services', RepairServiceController::class);

// Routes for service prices
Route::apiResource('set-price', ServicePriceController::class);

//
Route::get('get-price', [ServicePriceController::class, 'getServicePrice']);

// Get all "service_name" and all  iphone "model"
Route::get('data', [DataController::class, 'getAllData']);


// Order
Route::apiResource('orders', OrderController::class);


