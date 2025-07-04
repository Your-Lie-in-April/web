import { Toast } from '@components/layout';
import { useAppSelector } from '@redux/config/hook';
import useDeleteProjectLeaveMutation from './apis/mutations/project/useDeleteProjectLeaveMutation';
import useDeleteProjectMutation from './apis/mutations/project/useDeleteProjectMutation';
import useAllMemberInfoQuery from './apis/queries/member/useAllMemberInfoQuery';

export const useLeaveOrDeleteProject = (projectId: number) => {
    const userData = useAppSelector((state) => state.user.userData);
    const myId = userData?.memberId;

    const { data: members } = useAllMemberInfoQuery(Number(projectId));
    const privilegedMembers = members?.filter((member) => member.isPrivileged) ?? [];
    const isMePrivileged = privilegedMembers.some((member) => member.memberId === myId);

    const { mutate: deleteProject } = useDeleteProjectMutation(projectId);
    const { mutate: leaveProject } = useDeleteProjectLeaveMutation(projectId);

    const handleCancel = (onClose: () => void) => {
        onClose();
    };

    const handleLeave = async (onClose: () => void) => {
        try {
            if (isMePrivileged) {
                if (members && members?.length > 1) Toast('관리자 권한을 양도해주세요', 'error');
                else deleteProject();
            } else {
                leaveProject();
            }
        } catch (error) {
            console.log(error);
        }
        onClose();
    };

    return { handleCancel, handleLeave };
};
