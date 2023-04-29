import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


// const FilterRecord = Loadable(lazy(() => import('./FilterRecord')));

// =------------- OR--------------------------------

import FilterRecord from "./WeeklyRecord"
const TotalRegistrationDetails = Loadable(lazy(() => import('./Shared/TotalRegistrationDetails')));
const TotalCompetitionDetails = Loadable(lazy(() => import('./Shared/TotalCompetitionDetails')));

const FilterRecordRoute = [
  { path: '/weekly-filter/WeeklyRecord', element: <FilterRecord />, auth: authRoles.admin },
  { path: '/weekly-filter/TotalRegistrationDetails', element: <TotalRegistrationDetails /> },
  { path: '/weekly-filter/TotalCompetitionDetails', element: <TotalCompetitionDetails /> },
];

export default FilterRecordRoute;