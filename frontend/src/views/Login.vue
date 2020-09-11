<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Menu inicio de sesion</div>
                    <div class="card-body">
                        <div>
                            <form @submit.prevent="login">
                            <h3>Iniciar sesion</h3>
                            <input type="text" class="form-control mb-2" placeholder="Correo" v-model="user.email">
                            <input type="text" class="form-control mb-2" placeholder="Contraseña" v-model="user.password">
                            <button class="btn btn-primary" type="submit">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
     data() {
        return {
            user: {email: '', password: ''}
        }
    },
    methods:{
        login(){
            var url = 'http://127.0.0.1:8000/api/v1/auth/login';
            let formData = {
                email: this.user.email,
                password: this.user.password,
            };
            axios.post(url,formData)
            .then((result)=>{
                console.log(result);
            })
            .catch((error)=>{
                console.log(error); 
            })
        }
    }
}
</script>