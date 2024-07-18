import usePutMemberStatusMutation from '@hooks/apis/mutations/member/usePutMemberStatusMutation';
import { useUserContext } from '@hooks/context/userContext';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '../ModalCommon';

interface ChangeStatusProps {
    editStatusModal: boolean;
    onSetEditStatusModal: () => void;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({ editStatusModal, onSetEditStatusModal }) => {
    const [newState, setNewState] = useState('');
    const { userData, setUserData } = useUserContext();
    const { projectId } = useParams();

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 25) {
            setNewState(e.target.value);
        }
    };

    const { mutate } = usePutMemberStatusMutation(Number(userData?.memberId), Number(projectId));

    const handleStatusUpdate = async (newStatus: string) => {
        const status = newStatus.trim();
        if (status.trim() === '') {
            alert('상태 메세지를 입력해주세요 👀');
            return;
        }

        try {
            await mutate(status);
            onSetEditStatusModal();
        } catch (error) {
            console.error('상태 메세지 업데이트 실패:', error);
        }
    };

    useEffect(() => {
        if (editStatusModal) {
            setNewState('');
        }
    }, [editStatusModal]);

    useScrollLock(editStatusModal);

    return (
        <>
            {editStatusModal && (
                <ModalPortal>
                    <ModalBlackOut onClick={onSetEditStatusModal} />
                    <ModalContainer>
                        <Box>
                            <ModalContent>
                                <ModalHeader>
                                    <Title>상태메시지를 작성해주세요</Title>
                                    <InputWrapper>
                                        <StatusField
                                            type='text'
                                            onChange={handleStatusChange}
                                            maxLength={25}
                                        />
                                        <LimitText>{newState.length}/25</LimitText>
                                    </InputWrapper>
                                </ModalHeader>
                                <ButtonsContainer>
                                    <ConfirmBtn onClick={() => handleStatusUpdate(newState)}>
                                        확인
                                    </ConfirmBtn>
                                    <CancelBtn onClick={onSetEditStatusModal}>취소</CancelBtn>
                                </ButtonsContainer>
                            </ModalContent>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default ChangeStatus;

const Box = styled.div`
    width: 500px;
    height: 182px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 20px 20px;
    box-sizing: border-box;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 19px;
    width: 100%;
    height: 100%;
`;

const ModalHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 31px;
    width: 100%;
    height: 100%;
`;

const Title = styled.span`
    color: #000000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const StatusField = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    background: #ffffff;
    color: #000000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 4px 16px;
    box-sizing: border-box;
    border: none;
    outline: none;
    text-align: center;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;
    align-self: flex-end;
`;

const CommonButton = styled.button`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: Pretendard;
    font-size: 13px;
    font-weight: 500;
    line-height: normal;
    color: #ffffff;

    &:focus {
        border: none;
        outline: none;
    }
`;

const ConfirmBtn = styled(CommonButton)`
    background: #633ae2;
`;

const CancelBtn = styled(CommonButton)`
    background: #d9d9d9;
`;

const LimitText = styled.div`
    color: #a4a4a4;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    position: absolute;
    bottom: 4px;
    right: 16px;
`;
