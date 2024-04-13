import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js');
    worker.start();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
        <App />
    </React.StrictMode>
);
