import {RouteProps} from 'react-router-dom';
import Home from 'pages/HomePage/Home.tsx';
import {RequestPage} from 'pages/RequestPage';
import {RequestListPage} from 'pages/RequestListPage';
import LoginPage from 'pages/LoginPage/ui/LoginPage.tsx';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    REQUEST = 'request',
    LOGIN = 'login',
    REQUEST_LIST = 'request_list'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.REQUEST]: '/request',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REQUEST_LIST]: '/request-list'
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <Home/>
    },
    [AppRoutes.REQUEST]: {
        path: RoutePath.request,
        element: <RequestPage/>
    },
    [AppRoutes.REQUEST_LIST]: {
        path: RoutePath.request_list,
        element: <RequestListPage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />
    }

};
