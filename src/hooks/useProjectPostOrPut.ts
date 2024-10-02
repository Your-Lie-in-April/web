import { Toast } from '@components/layout';
import usePostProjectMutation from '@hooks/apis/mutations/project/usePostProjectMutation';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { resetEditState } from '@redux/reducers/edit';
import { setIsEdit } from '@redux/reducers/mode';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import usePutProjectMutation from './apis/mutations/project/usePutProjectMutation';
import { useProjectContext } from './context/projectContext';
dayjs.extend(utc);
dayjs.extend(timezone);

export const useProjectPostOrPut = () => {
    const navigate = useNavigate();
    const post = usePostProjectMutation();
    const { projectId } = useParams<{ projectId?: string }>();
    const put = usePutProjectMutation(Number(projectId));

    const {
        title,
        content,
        startDate,
        endDate,
        startTime,
        endTime,
        dayOfWeek,
        color,
        coverImageId,
    } = useAppSelector((state) => state.edit);
    const { isEdit } = useAppSelector((state: RootState) => state.mode);
    const dispatch = useAppDispatch();

    const formatTime = (time: string) => {
        const [ampm, timeString] = time.split(' ');
        let [hour, minute] = timeString.split(':').map(Number);

        if (ampm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0;
        }
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    };

    const addOneDay = (dateString: string | null): string | null => {
        if (!dateString) return null;
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    const convertToLocalDate = (dateString: string | null): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return dayjs(date).tz('Asia/Seoul').format('YYYY-MM-DD');
    };

    const { projectData } = useProjectContext();
    const originalPayload = useMemo(() => {
        if (!projectData) return null;

        return {
            title: projectData.title?.trim() || '',
            description: projectData.description || '',
            startDate: projectData.startDate || '',
            endDate: projectData.endDate || '',
            startTime: projectData.startTime || '',
            endTime: projectData.endTime || '',
            daysOfWeek: projectData.daysOfWeek || [],
            color: projectData.color || '',
            coverImageId: projectData.coverInfo?.id || '',
        };
    }, [projectData]);

    const currentPayload = useMemo(() => {
        let adjustedEndDate = endDate;
        if (endTime === 'AM 12:00') {
            adjustedEndDate = addOneDay(endDate);
        }

        return {
            title: title.trim(),
            description: content,
            startDate: convertToLocalDate(startDate),
            endDate: convertToLocalDate(adjustedEndDate),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            daysOfWeek: dayOfWeek,
            color: color,
            coverImageId: coverImageId,
        };
    }, [title, content, startDate, endDate, startTime, endTime, dayOfWeek, color, coverImageId]);

    const hasChanges = useMemo(() => {
        if (!isEdit || !originalPayload) return true;

        return JSON.stringify(currentPayload) !== JSON.stringify(originalPayload);
    }, [currentPayload, originalPayload, isEdit]);

    const actionProject = async () => {
        if (!title.trim()) {
            Toast('프로젝트 제목을 작성해주세요', 'error');
            return;
        }

        if (dayOfWeek.length === 0) {
            Toast('생성할 요일을 선택해주세요', 'error');
            return;
        }

        try {
            if (!isEdit) {
                await post.mutateAsync(currentPayload);
                dispatch(resetEditState());
                navigate('/');
            } else {
                if (hasChanges) {
                    await put.mutateAsync(currentPayload);
                }
                dispatch(setIsEdit(false));
                dispatch(resetEditState());
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.data;
            console.error(errorMessage);
        }
    };

    return { actionProject };
};
