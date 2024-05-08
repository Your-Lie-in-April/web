import MainPage from './Pages/MainPage/MainPage';
import ProjectMakePage from './Pages/ProjectMakePage/projectmakepage';
import './App.css';
import Login from './Pages/MainPage/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './Pages/ProjectPage/ProjectPage';
import StoragePage from './Pages/StoragePage/StoragePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from './Pages/MainPage/MainPage';

const queryClient = new QueryClient();

function App() {
    const URL = "/"
    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="projectmake" element={<ProjectMakePage />} />
                        <Route path="project" element={<ProjectPage />} />
                        <Route path="myproject" element={<StoragePage />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </UserProvider>
    );
}

export default App;
