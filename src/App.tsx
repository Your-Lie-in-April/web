import { GlobalErrorBoundary } from '@pages/error/GlobalErrorBoundary';
import BaseRoute from '@routes/BaseRoute';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@utils/queryClient';
import ScrollToTop from '@utils/ScrollToTop';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer limit={1} />
            <GlobalErrorBoundary>
                <Router>
                    <ScrollToTop />
                    <BaseRoute />
                </Router>
            </GlobalErrorBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
