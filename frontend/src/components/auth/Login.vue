<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Menu inicio de sesion</div>
                    <div class="card-body">
                        <div>
                            <form @submit.prevent="submit">
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
import {mapActions} from 'vuex'

export default {
    name: 'login',
     data() {
        return {
            user: {
                email: '', 
                password: '',
            }
        }
    },
    methods:{
        ...mapActions({
            login: 'auth/login'
        }),

        submit(){
            this.login(this.user).then(() => {
                this.$router.replace({
                    name: 'dashboard'
                })
            })
        }
    }
}
</script>