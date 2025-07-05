import { AlarmEntity } from '@/types/alarmType';
import { API } from '@constants/api';
import { QUERY_KEY } from '@constants/queryKey';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { setProjectLastAlarmId } from '@redux/slice/alarm';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useSSE = () => {
    const queryClient = useQueryClient();
    const accessToken = localStorage.getItem('access_token');

    const memberId = localStorage.getItem('member_id');
    const dispatch = useAppDispatch();
    const { projectId } = useParams();

    const projectLastId = useAppSelector((state) =>
        projectId ? state.alarm.projectLastAlarmId[Number(projectId)] : null
    );

    const [allAlarms, setAllAlarms] = useState<AlarmEntity[]>([]);

    const fetchSSEData = useCallback(() => {
        return new Promise<AlarmEntity[]>((resolve) => {
            if (!memberId) {
                resolve([]);
                return;
            }

            let lastId: string | null = null;

            // 특정 프로젝트 페이지: 리덕스에서 가져옴
            if (projectId != null) {
                lastId = projectLastId ? String(projectLastId) : null;
            } else {
                // 메인 페이지: 로컬 스토리지에서 가져옴
                lastId = localStorage.getItem('mainLastAlarmId');
            }

            // SSE URL 구성
            const sseUrl = projectId
                ? `${API.NOTIFICATION_SSE}?projectId=${projectId}&lastId=${lastId || ''}`
                : `${API.NOTIFICATION_SSE}?lastId=${lastId || ''}`;

            const eventSource = new EventSourcePolyfill(sseUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Connection: 'keep-alive',
                    Accept: 'text/event-stream',
                },
                // withCredentials: true,
                heartbeatTimeout: 86400000,
            });

            eventSource.onopen = () => {
                console.log('%c📢 SSE connect success!', 'color: green; font-weight: bold;');
            };

            const handleNotification = (event: MessageEvent) => {
                const data = JSON.parse(event.data);

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

                // 마지막 알림 ID 저장 로직
                if (projectId != null) {
                    // 특정 프로젝트 페이지: Redux에 저장
                    dispatch(
                        setProjectLastAlarmId({
                            projectId: Number(projectId),
                            alarmId: newAlarm.notificationId,
                        })
                    );
                } else {
                    // 메인 페이지: localStorage에 저장
                    localStorage.setItem('mainLastAlarmId', String(newAlarm.notificationId));
                }

                // 쿼리 캐시 업데이트
                queryClient.setQueryData<AlarmEntity[]>(QUERY_KEY.ALARM_SSE, (oldData = []) => [
                    newAlarm,
                    ...oldData,
                ]);

                // 로컬 상태 업데이트
                setAllAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);
            };

            // 일반 알림 처리
            (eventSource as any).addEventListener('notification', handleNotification);

            // 누락된 알림들 일괄 처리 (서버에서 재전송된 알림들)
            (eventSource as any).addEventListener('missed-notifications', (event: MessageEvent) => {
                const missedAlarms: AlarmEntity[] = JSON.parse(event.data);

                if (missedAlarms.length > 0) {
                    console.log(
                        `%c📨 받지못한 알림 ${missedAlarms.length}개를 복구했습니다.`,
                        'color: orange; font-weight: bold;'
                    );

                    // 가장 최신 알림의 ID를 마지막 알림 ID로 저장
                    const latestAlarm = missedAlarms[0]; // 서버에서 최신순으로 정렬되어 온다고 가정

                    if (projectId != null) {
                        dispatch(
                            setProjectLastAlarmId({
                                projectId: Number(projectId),
                                alarmId: latestAlarm.notificationId,
                            })
                        );
                    } else {
                        localStorage.setItem('mainLastAlarmId', String(latestAlarm.notificationId));
                    }

                    // 누락된 알림들을 상태에 추가
                    setAllAlarms((prevAlarms) => [...missedAlarms, ...prevAlarms]);
                }
            });

            eventSource.onerror = (err) => {
                console.error('SSE EventSource failed:', err);
                eventSource.close();

                // 5초 후 재연결 시도
                setTimeout(() => {
                    if (memberId) {
                        console.log('%c🔄SSE 재연결 시도 중🔄', 'color: blue; font-weight: bold;');
                        fetchSSEData();
                    }
                }, 5000);
            };

            return () => {
                eventSource.close();
            };
        });
    }, [queryClient, memberId, dispatch, projectId, projectLastId]);

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
                // 중복 제거 로직 개선
                const uniqueAlarms = Array.from(
                    new Map(
                        [...data, ...prev].map((alarm) => [alarm.notificationId, alarm])
                    ).values()
                );
                return uniqueAlarms;
            });
        }
    }, [data]);

    return { allAlarms, fetchSSEData };
};
