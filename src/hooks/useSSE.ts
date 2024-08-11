import { AlarmEntity } from '@/types/alarmType';
import { API } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
                    console.log('%c📢 SSE connect success!', 'color: green; font-weight: bold;');
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
                        return [newAlarm, ...oldData];
                    });

                    setAllAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);
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

    const { data } = useQuery({
        queryKey: QUERY_KEY.ALARM_SSE,
        queryFn: fetchSSEData,
        staleTime: 60000,
        gcTime: 5 * 60000,
        refetchInterval: false,
    });

    useEffect(() => {
        if (data) {
            setAllAlarms((prev) => {
                return Array.from(new Set([...data, ...prev]));
            });
        }
    }, [data]);

    return { allAlarms, fetchSSEData };
};
