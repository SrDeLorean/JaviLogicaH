import store from '@/store'

export const TourRoutes = [
    {
        path: '/tour',
        redirect: 'dashboard',
        component: () => import('@/views/Layout/DashboardLayoutAdmin.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
                }
                if(store.getters['auth/user'].role!="tour"){
                return next({
                    name: 'dashboard'
                })
            }
            next()
        },
        children: [
            {
                path: 'dashboard',
                name: 'tour-dashboard',
                component: () => import('@/views/Dashboard.vue')
            }
        ]
    }
];