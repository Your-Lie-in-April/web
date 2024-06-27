import MainPage from '#/Pages/MainPage/MainPage';
import ProjectMakePage from '#/Pages/ProjectMakePage/projectmakepage';
import ProjectPage from '#/Pages/ProjectPage/ProjectPage';
import StoragePage from '#/Pages/StoragePage/StoragePage';
import { Route, Routes } from 'react-router-dom';

export default function AuthRoute() {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='projectmake' element={<ProjectMakePage />} />
            <Route path='project/:projectId' element={<ProjectPage />} />
            <Route path='myproject' element={<StoragePage />} />
        </Routes>
    );
}
