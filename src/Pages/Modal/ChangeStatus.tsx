import { Http } from '#/constants/backendURL';
import ModalPortal from '#/utils/ModalPotal';
import useScrollLock from '#/utils/useScrollLock';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../MainPage/MainPage';
import { ModalBlackOut, ModalContainer } from './ModalCommon';

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

const Title = styled.text`
    color: #000000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
    padding: 9px 16px;
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

interface ChangeStatusProps {
    editStatusModal: boolean;
    onSetEditStatusModal: () => void;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({ editStatusModal, onSetEditStatusModal }) => {
    const { userData, setUserData } = useUserContext();
    const [newState, setNewState] = useState('');
    const accessToken = localStorage.getItem('access_token');

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewState(e.target.value);
    };

    const updateStatus = async () => {
        try {
            const finalStatus = newState.trim() === '' ? '(없음)' : newState;
            const response = await fetch(`${Http}/v1/members/${finalStatus}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ state: finalStatus }),
            });
            if (!response.ok) throw new Error('Status update failed');

            const updatedUserData = await response.json();
            setUserData({ ...userData, state: updatedUserData.state });
            onSetEditStatusModal();
            window.location.reload();
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };

    useScrollLock(editStatusModal);

    return (
        <>
            {editStatusModal && (
                <ModalPortal>
                    <ModalBlackOut onClick={onSetEditStatusModal} />
                    <ModalContainer>
                        <Box>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '19px',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '31px',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <Title>상태메시지를 작성해주세요</Title>
                                    <StatusField
                                        type="text"
                                        placeholder={userData?.state}
                                        onChange={handleStatusChange}
                                    />
                                </div>
                                <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                                    <ConfirmBtn onClick={updateStatus}>확인</ConfirmBtn>
                                    <CancelBtn onClick={onSetEditStatusModal}>취소</CancelBtn>
                                </ButtonsContainer>
                            </div>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default ChangeStatus;
