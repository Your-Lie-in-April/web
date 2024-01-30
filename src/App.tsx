import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/resource', {
                    method: 'GET',
                });
                if (response.ok) {
                    const result = await response.text();
                    console.log('Result: ', result);
                    setData(result);
                }
            } catch (error) {
                console.error('Error', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div>MSW로 받아온 데이터</div>
            <div>
                <pre>{data}</pre>
            </div>
        </div>
    );
}

export default App;
