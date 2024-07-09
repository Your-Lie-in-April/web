import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { UserProvider } from './Pages/MainPage/MainPage';
import BaseRoute from './route/BaseRoute';
import ScrollToTop from './utils/ScrollToTop';

function App() {
    return (
        <UserProvider>
            <Router>
                <ScrollToTop />
                <BaseRoute />
            </Router>
        </UserProvider>
    );
}

export default App;
