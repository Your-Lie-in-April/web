import Login from '@Pages/Login/Login';
import MainPage from '@Pages/MainPage/MainPage';
import InvitationAccept from '@Pages/Modal/project/InvitationAccept';
import ProjectMakePage from '@Pages/ProjectMakePage/projectmakepage';
import ProjectPage from '@Pages/ProjectPage/ProjectPage';
import StoragePage from '@Pages/StoragePage/StoragePage';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NotFoundRoute from './NotFoundRoute';
import PrivateRoute from './PrivateRoute';
import UnPrivateRoute from './UnPrivateRoute';

export default function BaseRoute() {
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const memberId = searchParams.get('member_id');
        if (accessToken) localStorage.setItem('access_token', accessToken);
        if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        if (memberId) localStorage.setItem('member_id', memberId);
    }, [location, navigate]);

    return (
        <>
            <Routes location={background || location}>
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
                    <Route
                        path='/invitation/:url'
                        element={
                            <>
                                <MainPage />
                                <InvitationAccept />
                            </>
                        }
                    />
                    <Route path='projectmake' element={<ProjectMakePage />} />
                    <Route path='project/:projectId' element={<ProjectPage />} />
                    <Route path='myproject' element={<StoragePage />} />
                </Route>
                <Route path='*' element={<NotFoundRoute />} />
            </Routes>
        </>
    );
}
