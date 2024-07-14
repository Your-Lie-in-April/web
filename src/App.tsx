import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { UserProvider } from './hooks/context/userContext';
import BaseRoute from './route/BaseRoute';
import ScrollToTop from './utils/ScrollToTop';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Router>
                    <ScrollToTop />
                    <BaseRoute />
                </Router>
            </UserProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
