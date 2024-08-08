import usePutMemberNickMutation from '@hooks/apis/mutations/member/usePutMemberNickMutation';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '../ModalCommon';

interface ChangeNickNameProps {
    isEditModal: boolean;
    onSetIsEditModal: () => void;
}

const ChangeNickName: React.FC<ChangeNickNameProps> = ({ isEditModal, onSetIsEditModal }) => {
    const [newNick, setNewNick] = useState<string>('');
    const { projectId } = useParams();
    const { mutate } = usePutMemberNickMutation(Number(projectId));

    const handleChangeNickname = async (newNick: string) => {
        const nickname = newNick.trim();
        if (nickname === '') {
            alert('닉네임을 입력해주세요 👀');
            return;
        }
        try {
            await mutate(nickname);
            onSetIsEditModal();
        } catch (error) {
            console.error('닉네임 변경 실패:', error);
        }
    };

    const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNick(e.target.value);
    };

    useScrollLock(isEditModal);

    return (
        <>
            {isEditModal && (
                <ModalPortal>
                    <ModalBlackOut onClick={onSetIsEditModal} />
                    <ModalContainer>
                        <Box>
                            <ModalContentWrapper>
                                <Title>프로젝트에서 사용할 닉네임을 작성해주세요</Title>
                                <NickNameField type='text' onChange={handleNickChange} />
                                <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                                    <ConfirmBtn onClick={() => handleChangeNickname(newNick)}>
                                        확인
                                    </ConfirmBtn>
                                    <CancelBtn onClick={onSetIsEditModal}>취소</CancelBtn>
                                </ButtonsContainer>
                            </ModalContentWrapper>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default ChangeNickName;

const Box = styled.div`
    width: 504px;
    height: 167px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 20px 20px;
    box-sizing: border-box;
`;

const ModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    color: #000000;
    font-family: 'Pretendard';
    line-height: normal;
    font-size: 20px;
    font-weight: 700;
`;

const NickNameField = styled.input`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    background: #ffffff;
    color: #000000;
    font-size: 18px;
    font-weight: 400;
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
`;

const CommonButton = styled.button`
    display: flex;
    width: 60px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 20px;
    font-family: 'Pretendard';
    font-size: 13px;
    font-weight: 500;
    line-height: normal;

    &:focus {
        border: none;
        outline: none;
    }
`;

const ConfirmBtn = styled(CommonButton)`
    background: #633ae2;
    color: #ffffff;
`;

const CancelBtn = styled(CommonButton)`
    background: #d9d9d9;
    color: #ffffff;
`;
