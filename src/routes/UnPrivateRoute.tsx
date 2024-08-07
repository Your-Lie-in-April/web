import getIsLogin from '@utils/getIsLogin';
import { Navigate } from 'react-router-dom';

export default function UnPrivateRoute({ children }: { children: React.ReactNode }) {
    return getIsLogin() ? <Navigate to='/' replace /> : <>{children}</>;
}
