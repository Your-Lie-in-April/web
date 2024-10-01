import { UserProvider } from '@hooks/context/userContext';
import Login from '@pages/login/Login';
import MainPage from '@pages/main/MainPage';
import MakePage from '@pages/makePage';
import InvitationAccept from '@pages/modal/project/InvitationAccept';
import ProjectPage from '@pages/project/ProjectPage';
import StoragePage from '@pages/storage/StoragePage';
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
                        <UserProvider>
                            <PrivateRoute>
                                <AuthRoute />
                            </PrivateRoute>
                        </UserProvider>
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
                    <Route path='projectmake' element={<MakePage />} />
                    <Route path='project/:projectId' element={<ProjectPage />} />
                    <Route path='myproject' element={<StoragePage />} />
                </Route>
                <Route path='*' element={<NotFoundRoute />} />
            </Routes>
        </>
    );
}
