import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return;
    }
    const { worker } = await import('./mocks/browser.js');
    return worker.start();
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
