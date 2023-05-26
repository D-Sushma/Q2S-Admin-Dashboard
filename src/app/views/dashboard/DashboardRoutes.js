import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));
const ActiveUsers = Loadable(lazy(() => import('./navigation-page/ActiveUsers')));
const CurrentRegistration = Loadable(lazy(() => import('./navigation-page/CurrentRegistration')));
const CurrentCompetition = Loadable(lazy(() => import('./navigation-page/CurrentCompetition')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
  { path: '/dashboard/navigation-page/ActiveUsers', element: <ActiveUsers />, auth: authRoles.admin },
  { path: '/dashboard/navigation-page/CurrentRegistration', element: <CurrentRegistration />, auth: authRoles.admin },
  { path: '/dashboard/navigation-page/CurrentCompetition', element: <CurrentCompetition />, auth: authRoles.admin },
];

export default dashboardRoutes;