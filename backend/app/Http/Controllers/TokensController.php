<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Exceptions\HttpResponseException;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class TokensController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Wrong validation',
                'data' => $validator->errors()
            ], 422);
        }
        $token = JWTAuth::attempt($credentials);
        if ($token) {
            return response()->json([
                'success' => true,
                'message' => 'Correct login',
                'data' =>['token' => $token]
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Wrong credentials',
                'data' => $validator->errors()], 401);
        }
    }

    public function me()
    {
        $credencials = JWTAuth::parseToken()->authenticate();
        return response()->json([
            'success' => true,
            'message' => 'Correct login',
            'data' =>['user' => $credencials]
        ], 200);
    }

    public function refreshToken()
    {
        $token = JWTAuth::getToken();
        try {
            $token = JWTAuth::refresh($token);
            return response()->json(['success' => true, 'token' => $token], 200);
        } catch (TokenExpiredException $ex) {
            // We were unable to refresh the token, our user needs to login again
            return response()->json([
                'success' => false, 
                'message' => 'Need to login again, please (expired)!',
                'data' => []
            ], 422);
        } catch (TokenBlacklistedException $ex) {
            // Blacklisted token
            return response()->json([
                'success' => false, 
                'message' => 'Need to login again, please (blacklisted)!',
                'data' => []
            ], 422);
        }

    }

    public function logoutToken()
    {
        //  $this->validate($request, ['token' => 'required']);
        $token = JWTAuth::getToken();
        try {
            $token = JWTAuth::invalidate($token);
            return response()->json([
                'success' => true, 
                'message' => "You have successfully logged out.",
                'data' => []
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false, 
                'message' => 'Failed to logout, please try again.',
                'data' => []
            ], 422);
        }
    }
}