import store from '@/store'

export const AdminRoutes = [
    {
        path: '/admin',
        redirect: 'dashboard',
        component: () => import('@/views/Layout/DashboardLayoutAdmin.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'login'
                })
                }
                if(store.getters['auth/user'].role!="admin"){
                return next({
                    name: 'dashboard'
                })
            }
            next()
        },
        children: [
            {
                path: 'dashboard',
                name: 'admin-dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: 'user',
                name: 'admin-user',
                component: () => import( '@/views/admin/User.vue')
            }
        ]
    }
];