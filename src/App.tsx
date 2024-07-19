import BaseRoute from '@routes/BaseRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollToTop from '@utils/ScrollToTop';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Router>
                <ScrollToTop />
                <BaseRoute />
            </Router>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
