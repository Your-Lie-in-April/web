import Login from '#/Pages/Login/Login';
import getIsLogin from '#/utils/getIsLogin';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import UnPrivateRoute from './UnPrivateRoute';

export default function BaseRoute() {
    return (
        <Routes>
            <Route
                path='/login'
                element={
                    <UnPrivateRoute>
                        <Login />
                    </UnPrivateRoute>
                }
            />
            <Route
                path='/*'
                element={
                    <PrivateRoute>
                        <AuthRoute />
                    </PrivateRoute>
                }
            />
            <Route
                path='*'
                element={
                    getIsLogin() ? <Navigate to='/' replace /> : <Navigate to='/login' replace />
                }
            />
        </Routes>
    );
}
