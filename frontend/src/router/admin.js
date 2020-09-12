import store from '@/store'

export const AdminRoutes = [
    {
        path: '/dashboard',
        name: 'admin-dashboard',
        component: () => import( '../views/admin/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
            return next({
                name: 'login'
            })
            }
            if(store.getters['auth/user'].role!="admin"){
            return next({
                name: 'home'
            })
            }
            next()
        }
    },
    {
        path: '/user',
        name: 'admin-user',
        component: () => import( '../views/admin/User.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
            return next({
                name: 'login'
            })
            }
            if(store.getters['auth/user'].role!="admin"){
            return next({
                name: 'home'
            })
            }
            next()
        }
    }
];