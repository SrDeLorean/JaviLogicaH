import store from '@/store'

export const TourRoutes = [
    {
        path: '/dashboard',
        name: 'tour-dashboard',
        component: () => import( '../views/tour/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
            return next({
                name: 'login'
            })
            }
            if(store.getters['auth/user'].role!="tour"){
            return next({
                name: 'home'
            })
            }
            next()
        }
    }
];