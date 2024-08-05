import { ProjectMemberResDto } from '@/types/projectType';
import { Toast } from '@pages/layouts/Toast';
import { useState } from 'react';
import useDeleteProjectLeaveMutation from './apis/mutations/project/useDeleteProjectLeaveMutation';
import useDeleteProjectMutation from './apis/mutations/project/useDeleteProjectMutation';
import useProjectMemberQuery from './apis/queries/project/useProjectMemberQuery';

export const useLeaveProject = (projectId: number, isModalOpen: boolean) => {
    const [message, setMessage] = useState<string>('해당 프로젝트에서 나가겠습니까?');

    const { data: members } = useProjectMemberQuery(projectId, {
        enabled: isModalOpen,
        onSuccess: (data: ProjectMemberResDto) => {
            if (data.length === 1) {
                setMessage('해당 프로젝트를 삭제하시겠습니까?');
            }
        },
        gcTime: 0,
    });

    const { mutate: deleteProject } = useDeleteProjectMutation(projectId);
    const { mutate: leaveProject } = useDeleteProjectLeaveMutation(projectId);

    const handleCancel = (onClose: () => void) => {
        onClose();
    };

    const handleLeave = async (onClose: () => void) => {
        try {
            if (members && members.length === 1) {
                deleteProject();
            } else {
                leaveProject();
            }
        } catch (error) {
            console.error('useLeaveProject Error:', error);
            if (error instanceof Error && error.message.includes('400')) {
                Toast('📣관리자는 나갈 수 없습니다', 'error');
            }
        }
        onClose();
    };

    return {
        message,
        handleCancel,
        handleLeave,
    };
};
