// Pages
import RootPage from './Layout/Root';

// React
import store from './store';

const routes = [
    {
        path: '/',
        exact: true,
        strict: false,
        component: RootPage,
    },
    {
        path: '/form',
        exact: false,
        strict: false,
        component: RootPage,
    },
];
export default routes;
