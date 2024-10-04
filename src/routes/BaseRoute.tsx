import InvitationAccept from '@components/modal/projectModal/InvitationAccept';
import { UserProvider } from '@hooks/context/userContext';
import { useAuth } from '@hooks/useAuth';
import { useResetState } from '@hooks/useResetState';
import useScrollToTop from '@hooks/useScrollToTop';
import LoginPage from '@pages/loginPage';
import MainPage from '@pages/mainPage';
import MakePage from '@pages/makePage';
import ProjectPage from '@pages/projectPage';
import StoragePage from '@pages/storagePage';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NotFoundRoute from './NotFoundRoute';
import PrivateRoute from './PrivateRoute';
import UnPrivateRoute from './UnPrivateRoute';

export default function BaseRoute() {
    useAuth();

    useResetState();
    useScrollToTop();

    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route
                    path='/login'
                    element={
                        <UnPrivateRoute>
                            <LoginPage />
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
                    <Route path='make' element={<MakePage />} />
                    <Route path='project/:projectId' element={<ProjectPage />} />
                    <Route path='storage' element={<StoragePage />} />
                </Route>
                <Route path='*' element={<NotFoundRoute />} />
            </Routes>
        </>
    );
}
