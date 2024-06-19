import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import MainPage, { UserProvider } from './Pages/MainPage/MainPage';
import ProjectMakePage from './Pages/ProjectMakePage/projectmakepage';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import StoragePage from './Pages/StoragePage/StoragePage';
import ScrollToTop from './utils/ScrollToTop';

function App() {
    return (
        <UserProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='projectmake' element={<ProjectMakePage />} />
                    <Route
                        path='project/:projectId'
                        element={<ProjectPage />}
                    />
                    <Route path='myproject' element={<StoragePage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
