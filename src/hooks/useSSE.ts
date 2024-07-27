import { API } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useCallback, useEffect } from 'react';

export type AlarmMessageType = {
    projectTitle: string;
    message: string;
    createdAt: string;
    projectId: number;
    notificationId: number;
    isChecked: boolean;
};

export const useSSE = () => {
    const queryClient = useQueryClient();
    const accessToken = localStorage.getItem('access_token');

    const fetchSSEData = useCallback(() => {
        return new Promise<AlarmMessageType[]>((resolve) => {
            resolve([]);
        });
    }, []);

    useEffect(() => {
        const connect = () => {
            if (!accessToken) {
                return;
            }

            const eventSource = new EventSourcePolyfill(API.NOTIFICATION_SSE, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Connection: 'keep-alive',
                    Accept: 'text/event-stream',
                },
                heartbeatTimeout: 86400000,
            });

            const handleNotification = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                const newAlarm: AlarmMessageType = {
                    projectTitle: data.project.title,
                    message: data.message,
                    createdAt: data.createdAt,
                    projectId: data.project.projectId,
                    notificationId: data.notificationId,
                    isChecked: false,
                };

                queryClient.setQueryData<AlarmMessageType[]>(QUERY_KEY.ALARM_SSE, (oldData = []) =>
                    [newAlarm, ...oldData].slice(0, 5)
                );
            };

            (eventSource as any).addEventListener('notification', handleNotification);

            eventSource.onerror = (err) => {
                console.error('SSE EventSource failed:', err);
                eventSource.close();
                setTimeout(connect, 5000 * 2);
            };

            return () => {
                eventSource.close();
            };
        };

        return connect();
    }, [queryClient, accessToken]);

    return fetchSSEData;
};
