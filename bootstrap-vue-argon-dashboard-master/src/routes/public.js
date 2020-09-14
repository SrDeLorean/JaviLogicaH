export const PublicRoutes = [
  {
    path: '/welcome',
    redirect: 'welcome',
    component: () => import('@/views/Pages/AuthLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/Pages/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/Pages/Register.vue')
      },
      { 
        path: '*', 
        name: '404',
        component: () => import('@/views/NotFoundPage.vue') 
      }
    ]
  }
];