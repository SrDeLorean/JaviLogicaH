import store from '@/store'

export const UserRoutes = [
    {
        path: '/user',
        redirect: 'dashboard',
        component: () => import('@/views/Layout/DashboardLayoutAdmin.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
                }
                if(store.getters['auth/user'].role!="user"){
                return next({
                    name: 'dashboard'
                })
            }
            next()
        },
        children: [
            {
                path: 'dashboard',
                name: 'user-dashboard',
                component: () => import('@/views/Dashboard.vue')
            }
        ]
    }
];