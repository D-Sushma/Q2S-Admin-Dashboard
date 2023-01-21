import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import CompetitionListRoutes from './views/competition-list/CompetitionListRoutes';
import MemberRegistrationRoutes from './views/registration/MemberRegistrationRoutes';
import CompetitionGroupRoutes from './views/competition-group/CompetitionGroupRoutes';



const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
        {/* <Registration /> */}
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...MemberRegistrationRoutes, ...CompetitionListRoutes, ...CompetitionGroupRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
  
  // MEMBER REGISTRATION  or COMPETITION-LIST------------------------------------------
  { path: '/registration/MemberRegistration', element: <Navigate to="/registration/MemberRegistration" /> },
  // ...MemberRegistrationRoutes,
  // ...CompetitionListRoutes,
  // ...CompititionGroupRoutes,
];

export default routes;
