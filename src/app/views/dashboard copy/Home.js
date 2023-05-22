import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const Home = [
    { path: '/dashboard/default', element: <Analytics />, auth: authRoles.admin },
];

export default Home;