import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


// const FilterRecord = Loadable(lazy(() => import('./FilterRecord')));

// =------------- OR--------------------------------

import FilterRecord from "./FilterRecord"
const TotalRegistrationDetails = Loadable(lazy(() => import('./Shared/TotalRegistrationDetails')));
const TotalCompetitionDetails = Loadable(lazy(() => import('./Shared/TotalCompetitionDetails')));

const FilterRecordRoute = [
  { path: '/filter/FilterRecord', element: <FilterRecord />, auth: authRoles.admin },
  { path: '/filter/TotalRegistrationDetails', element: <TotalRegistrationDetails /> },
  { path: '/filter/TotalCompetitionDetails', element: <TotalCompetitionDetails /> },
];

export default FilterRecordRoute;