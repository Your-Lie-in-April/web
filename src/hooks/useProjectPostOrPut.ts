import usePostProjectMutation from '@hooks/apis/mutations/project/usePostProjectMutation';
import { Toast } from '@pages/layouts/Toast';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { resetEditState } from '@redux/reducers/edit';
import { setIsEdit } from '@redux/reducers/mode';
import { useNavigate, useParams } from 'react-router';
import usePutProjectMutation from './apis/mutations/project/usePutProjectMutation';

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

    const actionProject = async () => {
        if (!title.trim()) {
            Toast('프로젝트 제목을 작성해주세요', 'error');
            return;
        }

        if (dayOfWeek.length === 0) {
            Toast('생성할 요일을 선택해주세요', 'error');
            return;
        }

        const convertToLocalDate = (dateString: string | null): string => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        };

        let adjustedEndDate = endDate;
        if (endTime === 'AM 12:00') {
            adjustedEndDate = addOneDay(endDate);
        }

        const payload = {
            title: title,
            description: content,
            startDate: convertToLocalDate(startDate),
            endDate: convertToLocalDate(adjustedEndDate),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            daysOfWeek: dayOfWeek,
            color: color,
            coverImageId: coverImageId,
        };

        try {
            if (!isEdit) {
                await post.mutateAsync(payload);
                dispatch(resetEditState());
                navigate('/');
            } else {
                await put.mutateAsync(payload);
                dispatch(setIsEdit(false));
                dispatch(resetEditState());
                window.location.reload();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.data;
            Toast(errorMessage, 'error');
        }
    };

    return { actionProject };
};
