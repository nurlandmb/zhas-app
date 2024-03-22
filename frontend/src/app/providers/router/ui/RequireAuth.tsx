import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.tsx';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = localStorage.getItem('zhas-token-2024')
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
    }

    return children;
}
