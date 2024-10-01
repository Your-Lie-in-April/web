import { GlobalErrorBoundary } from '@pages/errorPage/GlobalErrorBoundary';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@utils/queryClient';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import BaseRoute from './routes/BaseRoute';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <GlobalErrorBoundary>
                <Router>
                    <BaseRoute />
                </Router>
            </GlobalErrorBoundary>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
