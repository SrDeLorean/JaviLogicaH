import store from '@/store'

export const HotelRoutes = [
    {
        path: '/dashboard',
        name: 'hotel-dashboard',
        component: () => import( '../views/hotel/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
            return next({
                name: 'login'
            })
            }
            if(store.getters['auth/user'].role!="hotel"){
            return next({
                name: 'home'
            })
            }
            next()
        }
    }
];