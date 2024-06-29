import getIsLogin from '#/utils/getIsLogin';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return getIsLogin() ? <>{children}</> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
