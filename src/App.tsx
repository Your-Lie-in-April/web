import styled from 'styled-components';
import Info from './Pages/ProjectMakePage/Info';
import MainPage from './Pages/MainPage/MainPage';
import ProjectMakePage from './Pages/ProjectMakePage/projectmakepage';
import { Hidden } from '@mui/material';
import './App.css';
import Login from './Pages/MainPage/Login';
import { ReactDOM } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeforeLogin from './Pages/Layouts/BeforeLogin';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import StoragePage from './Pages/StoragePage/StoragePage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="projectmake" element={<ProjectMakePage />} />
                <Route path="project" element={<ProjectPage />} />
                <Route path="myproject" element={<StoragePage />} />
            </Routes>
        </Router>
    );
}

export default App;
