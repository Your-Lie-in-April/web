import React, { useState, useEffect } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alarms: React.FC = () => {
    const sseURL = 'http://localhost:8080/v1/sse/subscribe';
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const eventSource = new EventSourcePolyfill(sseURL, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: false,
        });

        eventSource.addEventListener('notification', (event: any) => {
            toast(event.data);
            console.log(event.data);
        });

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Alarms;
