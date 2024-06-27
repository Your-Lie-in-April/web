import Login from '#/Pages/Login/Login';
import MainPage from '#/Pages/MainPage/MainPage';
import ProjectMakePage from '#/Pages/ProjectMakePage/projectmakepage';
import ProjectPage from '#/Pages/ProjectPage/ProjectPage';
import StoragePage from '#/Pages/StoragePage/StoragePage';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NotFoundRoute from './NotFoundRoute';
import PrivateRoute from './PrivateRoute';
import UnPrivateRoute from './UnPrivateRoute';

export default function BaseRoute() {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const memberId = searchParams.get('member_id');
        if (accessToken) localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        if (memberId) localStorage.setItem('member_id', memberId);
    }, [location]);

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
                path='/'
                element={
                    <PrivateRoute>
                        <AuthRoute />
                    </PrivateRoute>
                }
            >
                <Route index element={<MainPage />} />
                <Route path='projectmake' element={<ProjectMakePage />} />
                <Route path='project/:projectId' element={<ProjectPage />} />
                <Route path='myproject' element={<StoragePage />} />
            </Route>
            <Route path='*' element={<NotFoundRoute />} />
        </Routes>
    );
}
