import { putMemberStatus } from '#/apis/member';
import { QUERY_KEY } from '#/constants/queryKey';
import { useUserContext } from '#/hooks/context/userContext';
import { MemberEntity } from '#/types/memberType';
import { memberId } from '#/utils/token';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePutMemberStatus = () => {
    const queryClient = useQueryClient();
    const { setUserData } = useUserContext();

    const mutation = useMutation({
        mutationFn: putMemberStatus,
        onSuccess: (result, newState) => {
            queryClient.setQueryData<MemberEntity | undefined>(
                QUERY_KEY.MEMBER_ID(memberId),
                (oldData) => {
                    if (oldData) {
                        const updatedData = { ...oldData, state: newState };
                        setUserData(updatedData);
                        return updatedData;
                    }
                    return oldData;
                }
            );
        },
    });

    const updateStatus = async (newState: string) => {
        try {
            await mutation.mutateAsync(newState);
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };

    return { updateStatus };
};

export default usePutMemberStatus;
