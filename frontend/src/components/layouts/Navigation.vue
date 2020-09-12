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
        <template v-if="user.role!=null">
            <template v-if="user.role=='admin'">
                <NavigationAdmin/>
            </template>
            <template v-else-if="user.role=='hotel'">
                <NavigationHotel/>
            </template>
            <template v-else-if="user.role=='tour'">
                <NavigationTour/>
            </template>
            <template v-else-if="user.role=='user'">
                <NavigationUser/>
            </template>
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
    import NavigationAdmin from '@/components/layouts/Admin'
    import NavigationHotel from '@/components/layouts/Hotel'
    import NavigationTour from '@/components/layouts/Tour'
    import NavigationUser from '@/components/layouts/User'
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
        },
        components: {
            NavigationAdmin,
            NavigationHotel,
            NavigationTour,
            NavigationUser
        },
    }
    
</script>
