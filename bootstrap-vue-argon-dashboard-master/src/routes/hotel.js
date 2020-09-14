import store from '@/store'

export const HotelRoutes = [
    {
        path: '/hotel',
        redirect: 'dashboard',
        component: () => import('@/views/Layout/DashboardLayoutAdmin.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
                }
                if(store.getters['auth/user'].role!="hotel"){
                return next({
                    name: 'dashboard'
                })
            }
            next()
        },
        children: [
            {
                path: 'dashboard',
                name: 'hotel-dashboard',
                component: () => import('@/views/Dashboard.vue')
            }
        ]
    }
];