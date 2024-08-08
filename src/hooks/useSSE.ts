import { AlarmEntity } from '@/types/alarmType';
import { API } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useCallback, useEffect, useState } from 'react';

export const useSSE = () => {
    const queryClient = useQueryClient();
    const accessToken = localStorage.getItem('access_token');
    const [allAlarms, setAllAlarms] = useState<AlarmEntity[]>([]);

    const fetchSSEData = useCallback(() => {
        return new Promise<AlarmEntity[]>((resolve) => {
            if (!accessToken) {
                resolve([]);
                return;
            }

            const connect = () => {
                const eventSource = new EventSourcePolyfill(API.NOTIFICATION_SSE, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Connection: 'keep-alive',
                        Accept: 'text/event-stream',
                    },
                    heartbeatTimeout: 86400000,
                });

                eventSource.onopen = () => {
                    console.log('SSE connect success!');
                };

                const handleNotification = (event: MessageEvent) => {
                    const data = JSON.parse(event.data);
                    console.log('Received SSE data:', data);
                    const newAlarm: AlarmEntity = {
                        notificationId: data.notificationId,
                        message: data.message,
                        project: data.project,
                        receiver: data.receiver,
                        sender: data.sender,
                        type: data.type,
                        isChecked: data.isChecked,
                        createdAt: data.createdAt,
                    };

                    queryClient.setQueryData<AlarmEntity[]>(QUERY_KEY.ALARM_SSE, (oldData = []) => {
                        const uniqueAlarms = [newAlarm, ...(oldData.filter(
                            (alarm) => alarm.notificationId !== newAlarm.notificationId
                        ))];
                        return uniqueAlarms.slice(0, 5);
                    });

                    resolve([newAlarm]);
                };

                (eventSource as any).addEventListener('notification', handleNotification);

                eventSource.onerror = (err) => {
                    console.error('SSE EventSource failed:', err);
                    eventSource.close();
                    setTimeout(() => {
                        if (accessToken) {
                            connect();
                        }
                    }, 5000 * 2);
                };

                return () => {
                    eventSource.close();
                };
            };

            return connect();
        });
    }, [queryClient, accessToken]);

    useEffect(() => {
        fetchSSEData().then((newAlarms) => {
            setAllAlarms((prev) => {
                const uniqueAlarms = [...new Set([...prev, ...newAlarms])];
                return uniqueAlarms;
            });
        });
    }, [fetchSSEData]);

    return fetchSSEData;
};