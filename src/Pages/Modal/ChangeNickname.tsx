import { useState } from 'react';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from './ModalCommon';
import ModalPortal from '#/utils/ModalPotal';
import useScrollLock from '#/utils/useScrollLock';


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

const Title = styled.div`
    color: #000000;
    font-family: Pretendard;
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
    padding: 9px 16px;
    box-sizing: border-box;
    border: none;
    outline: none;
    text-align : center;
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

    &: focus {
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

interface ChangeNickNameProps {
    onSetIsEditModal: () => void;
    onNickChange: (newNick: string) => void;
}

const ChangeNickName: React.FC<ChangeNickNameProps> = ({
    onSetIsEditModal,
    onNickChange,
}) => {
    const [newNick, setNewNick] = useState('');

    const handleConfirm = () => {
        console.log('new nickname:', newNick);
        onNickChange(newNick);
        onSetIsEditModal();
    };

    useScrollLock();
    
    return (
        <ModalPortal>
            <ModalBlackOut onClick={onSetIsEditModal} />
            <ModalContainer>
                <Box>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '18px',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Title>프로젝트에서 사용할 닉네임을 작성해주세요</Title>
                        <NickNameField
                            type="text"
                            value={newNick}
                            onChange={(e) => setNewNick(e.target.value)}
                        />
                        <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                            <ConfirmBtn onClick={handleConfirm}>
                                확인
                            </ConfirmBtn>
                            <CancelBtn onClick={onSetIsEditModal}>
                                취소
                            </CancelBtn>
                        </ButtonsContainer>
                    </div>
                </Box>
            </ModalContainer>
        </ModalPortal>
    );
};
export default ChangeNickName;
