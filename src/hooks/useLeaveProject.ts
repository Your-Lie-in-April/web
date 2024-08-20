import { Toast } from '@pages/layouts/Toast';
import { useEffect, useState } from 'react';
import useDeleteProjectLeaveMutation from './apis/mutations/project/useDeleteProjectLeaveMutation';
import useDeleteProjectMutation from './apis/mutations/project/useDeleteProjectMutation';
import useAllMemberInfoQuery from './apis/queries/member/useAllMemberInfoQuery';
import { useUserContext } from './context/userContext';

export const useLeaveProject = (projectId: number) => {
    const [message, setMessage] = useState<string>('해당 프로젝트에서 나가겠습니까?');
    const { userData } = useUserContext();
    const myId = userData?.memberId;

    const { data: members } = useAllMemberInfoQuery(Number(projectId));
    const privilegedMembers = members?.filter((member) => member.isPrivileged) ?? [];
    const isMePrivileged = privilegedMembers.some((member) => member.memberId === myId);
    useEffect(() => {
        if (isMePrivileged) {
            setMessage('해당 프로젝트를 삭제하시겠습니까?');
        }
    }, [isMePrivileged]);

    const { mutate: deleteProject } = useDeleteProjectMutation(projectId);
    const { mutate: leaveProject } = useDeleteProjectLeaveMutation(projectId);

    const handleCancel = (onClose: () => void) => {
        onClose();
    };

    const handleLeave = async (onClose: () => void) => {
        try {
            if (isMePrivileged) {
                if (members && members?.length > 1)
                    Toast('권한 양도후, 다시 시도해주세요', 'error');
                else deleteProject();
            } else {
                leaveProject();
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
    };

    return {
        message,
        handleCancel,
        handleLeave,
    };
};
