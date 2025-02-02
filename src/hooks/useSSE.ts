import { AlarmEntity } from '@/types/alarmType';
import { API } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useCallback, useEffect, useState, useRef } from 'react';

export const useSSE = () => {
    const queryClient = useQueryClient();
    const accessToken = localStorage.getItem('access_token');
    const [allAlarms, setAllAlarms] = useState<AlarmEntity[]>([]);
    const lastNotificationIdRef = useRef<string | null>(null);

    const fetchSSEData = useCallback(() => {
        return new Promise<AlarmEntity[]>((resolve) => {
            if (!accessToken) {
                resolve([]);
                return;
            }

            const connect = () => {
                const baseUrl = API.NOTIFICATION_SSE;
                const url = lastNotificationIdRef.current
                    ? `${baseUrl}?lastEventId=${lastNotificationIdRef.current}`
                    : baseUrl;

                const eventSource = new EventSourcePolyfill(url, {
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

                    // Update last notification ID
                    lastNotificationIdRef.current = newAlarm.notificationId;

                    queryClient.setQueryData<AlarmEntity[]>(QUERY_KEY.ALARM_SSE, (oldData = []) => {
                        return [newAlarm, ...oldData];
                    });

                    setAllAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);
                };

                eventSource.addEventListener('notification', handleNotification);

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