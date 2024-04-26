import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from './ModalCommon';
import ModalPortal from '../../utils/ModalPotal';

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

    &: focus {
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
    onSetEditStatusModal: () => void;
}

const ChangeStatus: React.FC<ChangeStatusProps> = ({
    onSetEditStatusModal,
}) => {
    return (
        <ModalPortal>
            <ModalBlackOut />
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
                            <StatusField type="text" />
                        </div>
                        <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                            <ConfirmBtn onClick={onSetEditStatusModal}>
                                확인
                            </ConfirmBtn>
                            <CancelBtn onClick={onSetEditStatusModal}>
                                취소
                            </CancelBtn>
                        </ButtonsContainer>
                    </div>
                </Box>
            </ModalContainer>
        </ModalPortal>
    );
};
export default ChangeStatus;
