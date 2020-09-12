<template>
    <li>
        <router-link
        :to="{
            name:'hotel-dashboard'
            }"
            >
            Dashboard
            </router-link>
    </li>
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
