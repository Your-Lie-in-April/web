import { useAppDispatch } from '@redux/config/hook';
import {
    setColor,
    setContent,
    setCoverImageId,
    setDayOfWeek,
    setEndDate,
    setEndTime,
    setImg,
    setStartDate,
    setStartTime,
    setTitle,
} from '@redux/reducers/edit';
import { useCallback } from 'react';

const useDispatchProjectData = () => {
    const dispatch = useAppDispatch();

    const formatTimeToText = (timeString: string): string => {
        const [hours, minutes] = timeString.split(':');
        const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
        const formattedHours = (parseInt(hours) % 12 || 12).toString().padStart(2, '0');
        return `${period} ${formattedHours}:${minutes}`;
    };

    const dispatchProject = useCallback(
        (projectData: any) => {
            if (projectData) {
                dispatch(setTitle(projectData.title || ''));
                dispatch(setContent(projectData.description || ''));
                dispatch(setStartDate(projectData.startDate ? projectData.startDate : null));
                dispatch(setEndDate(projectData.endDate ? projectData.endDate : null));
                dispatch(
                    setStartTime(
                        projectData.startTime ? formatTimeToText(projectData.startTime) : 'AM 09:00'
                    )
                );
                dispatch(
                    setEndTime(
                        projectData.endTime ? formatTimeToText(projectData.endTime) : 'AM 09:30'
                    )
                );
                dispatch(setDayOfWeek(projectData.daysOfWeek || []));
                dispatch(setColor(projectData?.color || ''));
                dispatch(setCoverImageId(projectData.coverInfo?.id || ''));
                dispatch(setImg(projectData.coverInfo?.coverImageUrl || ''));
            }
        },
        [dispatch]
    );

    return dispatchProject;
};

export default useDispatchProjectData;
