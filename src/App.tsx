import { useEffect, useState } from 'react';

function App() {
    useEffect(() => {
        const Oauth = async () => {
            const response = await fetch('/api/v1/oauth2/status', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Oauth status', data);
            }
        };
        Oauth();

        const login = async () => {
            const body = {
                email: 'user@example.com',
                password: 'password123',
            };
            const response = await fetch('/api/v1/oauth2/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('login', data);
            } else {
                console.error('에러');
            }
        };
        login();
    }, []);
    return (
        <div>
            <div>MSW로 받아온 데이터</div>
        </div>
    );
}

export default App;
