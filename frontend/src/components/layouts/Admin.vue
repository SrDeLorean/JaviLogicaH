<template>
    <ul>
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
            <router-link
            :to="{
                name:'admin-user'
                }"
                >
                User
            </router-link>
        </li>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
    }
    
</script>
