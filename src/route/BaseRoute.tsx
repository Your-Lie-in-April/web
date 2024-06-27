import Login from '#/Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import UnPrivateRoute from './UnPrivateRoute';

export default function BaseRoute() {
    return (
        <Routes>
            <Route
                path='/*'
                element={
                    <PrivateRoute>
                        <AuthRoute />
                    </PrivateRoute>
                }
            />
            <Route
                path='/login'
                element={
                    <UnPrivateRoute>
                        <Login />
                    </UnPrivateRoute>
                }
            />
        </Routes>
    );
}
