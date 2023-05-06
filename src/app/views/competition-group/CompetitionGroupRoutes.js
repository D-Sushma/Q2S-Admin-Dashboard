import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const CompetitionGroup = Loadable(lazy(() => import('./CompetitionGroup')));
const MoreDetailsTable = Loadable(lazy(() => import('./Shared/MoreDetailsTable')));
const MoreDetailsTableData = Loadable(lazy(() => import('./Shared/MoreDetailsTableData')));

const CompetitionListRoute = [
  { path: '/competition-group/CompetitionGroup', element: <CompetitionGroup /> },
  { path: '/competition-group/MoreDetailsTable/:cgId', element: <MoreDetailsTable /> },
  { path: '/competition-group/MoreDetailsTableData/:cgId', element: <MoreDetailsTableData /> },
];

export default CompetitionListRoute;