import { PublicRoutes } from './public';
import { AdminRoutes } from './admin';
import { HotelRoutes } from './hotel';
import { TourRoutes } from './tour';
import { UserRoutes } from './user';

const routes = [
  ...PublicRoutes,
  ...AdminRoutes,
  ...HotelRoutes,
  ...TourRoutes,
  ...UserRoutes,
];

export default routes;
