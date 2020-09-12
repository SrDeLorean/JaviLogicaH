<template>
    <ul>
        <li>
            <router-link
            :to="{
                name:'home'
                }"
            >
            Home
            </router-link>
        </li>
        <template v-if="user.role=='admin'">
            <li>
                <router-link
                :to="{
                    name:'admin-dashboard'
                    }"
                    >
                    Dashboard
                    </router-link>
            </li>
             <li>
                <a href="#" @click.prevent="logout">
                    Logout
                </a>
            </li>
        </template>
        <template v-else-if="user.role=='hotel'">
            <li>
                <router-link
                :to="{
                    name:'hotel-dashboard'
                    }"
                    >
                    Dashboard
                    </router-link>
            </li>
             <li>
                <a href="#" @click.prevent="logout">
                    Logout
                </a>
            </li>
        </template>
        <template v-else-if="user.role=='tour'">
            <li>
                <router-link
                :to="{
                    name:'tour-dashboard'
                    }"
                    >
                    Dashboard
                    </router-link>
            </li>
             <li>
                <a href="#" @click.prevent="logout">
                    Logout
                </a>
            </li>
        </template>
        <template v-else-if="user.role=='user'">
            <li>
                <router-link
                :to="{
                    name:'user-dashboard'
                    }"
                    >
                    Dashboard
                    </router-link>
            </li>
             <li>
                <a href="#" @click.prevent="logout">
                    Logout
                </a>
            </li>
        </template>
        <template v-else>
            <li>
                <router-link
                :to="{
                    name:'login'
                    }"
                    >
                    Login
                    </router-link>
            </li>
        </template>
    </ul>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },

        methods: {
            ...mapActions({
                logoutAction: 'auth/logout'
            }),
        
            logout (){
                this.logoutAction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
    
</script>
