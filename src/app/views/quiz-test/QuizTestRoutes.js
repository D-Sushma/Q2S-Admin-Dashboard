// import Loadable from 'app/components/Loadable';
// import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';


// const QuizTest = Loadable(lazy(() => import('./QuizTest')));

// =------------- OR--------------------------------

import QuizTest from './QuizTest';

const QuizTestRoutes = [
    { path: '/quiz-test/QuizTest', element: <QuizTest />, auth: authRoles.admin },
];

export default QuizTestRoutes;