import store from '@/store'

export const UserRoutes = [
    {
        path: '/dashboard',
        name: 'user-dashboard',
        component: () => import( '../views/user/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
            return next({
                name: 'login'
            })
            }
            if(store.getters['auth/user'].role!="user"){
            return next({
                name: 'home'
            })
            }
            next()
        }
    }
];