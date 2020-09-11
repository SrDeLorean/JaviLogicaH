<?php

namespace App\Http\Controllers;
use App\User;
use Validator;
use Illuminate\Http\Request;
use App\Profesor_Con_Curso;
use App\Log;
use \App\Mail\SendMail;
use Mail;
use App\Mail\Correo;
use App\Mail\EmergencyCallReceived;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsuarioController extends Controller{

    /**
     * Contructor que se encarga de limitar los permisos a este controlador
     */
    public function __construct()
    {
        $this->middleware(['permission:read user'], ['only' => ['index', 'show']]);
        $this->middleware(['permission:create user'], ['only' => ['create', 'store']]);
        $this->middleware(['permission:update user'], ['only' => ['edit', 'update']]);
        $this->middleware(['permission:delete user'], ['only' => 'delete']);
        //$this->middleware(['permission:restore user'], ['only' => 'disabled', 'restore']);
    }
    
    /**
     * Metodo que se encarga de listar a los usuarios
     */
    public function index(){
        try{
            $users = User::all();
            return response()->json([
                'success' => true,
                'message' => "Se a listado usuarios con exito",
                'data' => ['users'=>$users]
            ], 200);
        } catch(\Illuminate\Database\QueryException $ex){  
            return response()->json([
                'success' => false,
                'message' => 'Error al solicitar peticion a la base de datos',
                'data' => ['error'=>$ex]
            ], 409);
        }
    }

    /**
     * Metodo que no sirve deberia redireccionar cuando funciona dentro de laravel
     */
    public function create(){
        return response()->json([
            'success' => false,
            'message' => 'el cliente debe usar un protocolo distinto',
            'data' => ['error'=>'El el protocolo se llama store']
        ], 426 );
    }

    /**
     * Metodo que se encarga de crear un usuario
     * Como usar:
     * Con el metodo http POST
     * Agregando a lo anterior debe enviar un json con la siguiente informacion:
     * name: nombre del usuario
     * role: rol si desea modificarlo
     * email: correo electronico
     * password: contraseña
     */
    public function store(Request $request){            
        $entradas = $request->only('name', 'role', 'email', 'password');
        $validator = Validator::make($entradas, [
            'name' => ['required','string'],
            'role' => ['required','string'], 
            'email'=> ['required','email'],
            'password' => ['required', 'string']
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error en datos ingresados',
                'data' => ['error'=>$validator->errors()]
            ], 422);
        }
        try{
            $user = new User();
            $user->name=$entradas['name'];
            $user->assignRole($entradas['role']);
            $user->email=$entradas['email'];
            $user->password=bcrypt($entradas['password']);
            $user->save();
            return response()->json([
                'success' => true,
                'message' => "Se a creado un usuario con exito",
                'data' => ['user'=>$user]
            ], 200);
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Tenemos problemas con nuestra base de datos, intente mas tarde",
                'data' => ['error'=>$ex]
            ], 409  );
        }
    }

    /**
     * Metodo que no sirve deberia redireccionar cuando funciona dentro de laravel
     */
    public function show($id){
        return response()->json([
            'success' => false,
            'message' => 'Error: El cliente debe usar un protocolo distinto',
            'data' => ['error'=>'El el protocolo se llama index']
        ], 426 );
    }

    /**
     * Metodo que permite mostrar los datos de un user para luego modificar
     */
    public function edit($id){
        return response()->json([
            'success' => false,
            'message' => 'Error: El cliente debe usar un protocolo distinto',
            'data' => ['error'=>'El el protocolo se llama update']
        ], 426 );
    }

    /**
     * Metodo que se encarga de modificar un usuario
     * Como usar:
     * Con el metodo http PUT|PATCH debe enviar en la url el id del usuario que desea modificar
     * Agregando a lo anterior debe enviar un json con la siguiente informacion:
     * name: nombre del usuario
     * role: rol si desea modificarlo
     * email: correo electronico
     * password: contraseña
     * si no desea modificar uno de estos parametros puede mandar null o ""
     */
    public function update(Request $request, $id)
    {
        $entradas = $request->only('name', 'role', 'email', 'password');
        $validator = Validator::make($entradas, [
            'name' => ['string', 'nullable'],
            'role' => ['string', 'nullable'],
            'email' => ['email', 'nullable'],
            'password' => ['string', 'nullable']
        ]);
        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Los datos ingresados son incorrectos',
                'data' =>['error'=> $validator->errors()]
            ], 422);
        }
        if(!array_key_exists ("name" , $entradas)){
            $entradas['name'] = null;
        }
        if(!array_key_exists ("role" , $entradas)){
            $entradas['role'] = null;
        }
        if(!array_key_exists ("email" , $entradas)){
            $entradas['email'] = null;
        }
        if(!array_key_exists ("password" , $entradas)){
            $entradas['password'] = null;
        }
        try{
            $user = User::find($id);
            if($user==null){
                return response()->json([
                    'success' => false,
                    'message' => 'El usuario con el id '.$id.' no existe en el sistema',
                    'data' => null
                ], 409);
            }
            if($entradas['name']!=null){
                $user->name = $entradas['name'];;
            }
            if($entradas['email']!=null){
                $user->email = $entradas['email'];;
            }
            if($entradas['password']!=null){
                $user->password = bcrypt($entradas['password']);
            }
            if($entradas['role']!=null){
                //$user->removeRole($user->rol);
                $user->assignRole($entradas['role']);
            }
            $user->save();
            return response()->json([
                'success' => true,
                'message' => "Se a modificado un usuario con exito",
                'data' => ['user'=>$user]
            ], 200);
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Tenemos problemas con nuestra base de datos, intente mas tarde",
                'data' => ['error'=>$ex]
            ], 409);
        }
    }
    
    /**
     * Metodo que se encarga de eliminar un usuario
     * Como usar:
     * Con el metodo http delete debe enviar en la url el id del usuario que decea eliminar
     */
    public function destroy($id){
        try{
            $user = User::find($id);
            if($user==null){
                return response()->json([
                    'success' => false,
                    'message' => 'El usuario con el id '.$id.' no existe',
                    'data' => null
                ], 409 );
            }
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => "Se a eliminado un usuario con exito",
                'data' => ['user'=>$user]
            ], 200);
        }catch(\Illuminate\Database\QueryException $ex){ 
            return response()->json([
                'success' => false,
                'message' => "Tenemos problemas con nuestra base de datos, intente mas tarde ",
                'data' => ['error'=>$ex]
            ], 409 );
        }
    }
}