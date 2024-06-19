import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import 'react-toastify/dist/ReactToastify.css';
import { Http } from '#/constants/backendURL';

const AlarmDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 312px;
    height: 918px;
    background-color: #f5f5f5;
    border-radius: 10px;
`;

const AlarmText = styled.div`
    width: 39px;
    height: 26px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #a4a4a4;
    margin: 24px auto;
    margin-top: 24px;
    opacity: 0.9;
    white-space: nowrap;
`;

const CommingSoon = styled.div`
    height: 33px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    color: #d9d9d9;
    margin: auto;
`;

const Alarm: FC = () => {
    const [alarmMessage, setAlarmMessage] = useState<string | null>(null);
    const sseURL = `${Http}/v1/sse/subscribe`;
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource;
        const eventSource = new EventSource(`${Http}/v1/sse/subscribe`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive',
                Accept: 'text/event-stream',
            },
            heartbeatTimeout: 86400000,
        });

        eventSource.addEventListener('notification', (event: any) => {
            console.log('에빈ㄴ드');
        });

        eventSource.addEventListener('message', (event: any) => {
            const { data } = event;
            setAlarmMessage(data);
        });

        eventSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [sseURL, token]);

    return (
        <AlarmDiv>
            <AlarmText>알림</AlarmText>
            {alarmMessage && <CommingSoon>{alarmMessage}</CommingSoon>}
        </AlarmDiv>
    );
};

export default Alarm;
