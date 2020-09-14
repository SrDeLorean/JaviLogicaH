import Vue from 'vue'
import VueRouter from 'vue-router';

import { PublicRoutes } from './public';
import { AdminRoutes } from './admin';
import { HotelRoutes } from './hotel';
import { TourRoutes } from './tour';
import { UserRoutes } from './user';

Vue.use(VueRouter)

const routes = [
  ...PublicRoutes,
  ...AdminRoutes,
  ...HotelRoutes,
  ...TourRoutes,
  ...UserRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router