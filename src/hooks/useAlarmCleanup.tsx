import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAllProjectLastAlarmId, removeProjectLastAlarmId } from '@redux/slice/alarm';

export const useAlarmCleanup = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            // 브라우저 종료 시 localStorage의 메인 페이지 알림 ID는 유지
            // Redux의 프로젝트별 알림 ID는 자동으로 초기화됨
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    useEffect(() => {
        // 로그아웃 시 모든 알림 ID 초기화
        const handleLogout = () => {
            localStorage.removeItem('mainLastAlarmId');
            dispatch(clearAllProjectLastAlarmId());
        };

        // 로그아웃 이벤트 리스너 등록 (실제 구현에 따라 다름)
        // window.addEventListener('user-logout', handleLogout);

        return () => {
            // window.removeEventListener('user-logout', handleLogout);
        };
    }, [dispatch]);

    useEffect(() => {
        // 프로젝트 페이지에서 나갈 때 해당 프로젝트의 알림 ID 정리
        const currentPath = location.pathname;
        const projectMatch = currentPath.match(/\/project\/(\d+)/);

        if (projectMatch) {
            const projectId = Number(projectMatch[1]);

            return () => {
                // 프로젝트 페이지를 떠날 때 해당 프로젝트의 알림 ID 삭제
                dispatch(removeProjectLastAlarmId({ projectId }));
            };
        }
    }, [location.pathname, dispatch]);
};

// 사용 예시
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    useAlarmCleanup();
    return <>{children}</>;
};
