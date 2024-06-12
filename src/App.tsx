import MainPage from './Pages/MainPage/MainPage';
import ProjectMakePage from './Pages/ProjectMakePage/projectmakepage';
import './App.css';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import StoragePage from './Pages/StoragePage/StoragePage';
import { UserProvider } from './Pages/MainPage/MainPage';
import ScrollToTop from './utils/ScrollToTop';

function App() {
    const URL = '/';
    return (
        <UserProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="projectmake" element={<ProjectMakePage />} />
                    <Route
                        path="project/:projectId"
                        element={<ProjectPage />}
                    />
                    <Route path="myproject" element={<StoragePage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
