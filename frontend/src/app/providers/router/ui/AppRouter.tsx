import React, {
    memo, Suspense, useCallback} from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes, AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig.tsx';
import RequireAuth from 'app/providers/router/ui/RequireAuth';

const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<div>Loading...</div>}>
                <div className="page-wrapper">
                    {route.element}
                </div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);
    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
            {/* {routes.map(({ element, path }) => ( */}
            {/*    <Route */}
            {/*        key={path} */}
            {/*        path={path} */}
            {/*        element={( */}
            {/*            <Suspense fallback={<PageLoader />}> */}
            {/*                <div className="page-wrapper"> */}
            {/*                    {element} */}
            {/*                </div> */}
            {/*            </Suspense> */}
            {/*        )} */}
            {/*    /> */}
            {/* ))} */}
        </Routes>
    );
});

export default AppRouter;
