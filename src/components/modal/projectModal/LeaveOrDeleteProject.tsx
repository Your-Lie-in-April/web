import { useLeaveOrDeleteProject } from '@hooks/useLeaveOrDeleteProject';
import useScrollLock from '@hooks/useScrollLock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalPortal from '@utils/modalPortal';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '..';

interface LeaveOrDeleteProjectProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: number;
    projectTitle: string;
}

const LeaveOrDeleteProject: React.FC<LeaveOrDeleteProjectProps> = ({
    isOpen,
    onClose,
    projectId,
    projectTitle,
}) => {
    const { handleLeave, handleCancel } = useLeaveOrDeleteProject(projectId);

    useScrollLock(isOpen);

    if (!isOpen) return null;

    return (
        <ModalPortal>
            <ModalBlackOut onClick={onClose} />
            <ModalContainer>
                <Box>
                    <OuterColumn>
                        <InnerColumn>
                            <InfoCircleIcon sx={{ fontSize: '32px' }} />
                            <PeojectName>{projectTitle}</PeojectName>
                            <Title>해당 프로젝트에서 나가겠습니까?</Title>
                        </InnerColumn>
                        <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                            <ConfirmBtn onClick={() => handleLeave(onClose)}>확인</ConfirmBtn>
                            <CancelBtn onClick={() => handleCancel(onClose)}>취소</CancelBtn>
                        </ButtonsContainer>
                    </OuterColumn>
                </Box>
            </ModalContainer>
        </ModalPortal>
    );
};
export default LeaveOrDeleteProject;

const Box = styled.div`
    width: 406px;
    min-height: 182px;
    border-radius: 20px;
    background: #f5f5f5;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 8px 20px;
    box-sizing: border-box;
`;

const OuterColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 100%;
`;

const InnerColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const InfoCircleIcon = styled(InfoOutlinedIcon)`
    width: 32px;
    height: 32px;
    color: #eb5757;
`;

const CommonText = styled.span`
    color: #000000;
    text-align: center;
    font-family: 'Pretendard';
    line-height: normal;
`;

const PeojectName = styled(CommonText)`
    font-size: 28px;
    font-weight: 700;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: pre-wrap;
    word-break: break-word;
`;

const Title = styled(CommonText)`
    font-size: 24px;
    font-weight: 400;
    display: block;
`;

const Button = styled.button.attrs({ type: 'button' })`
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
        outline: none;
    }
`;

const ConfirmBtn = styled(Button)`
    background: #633ae2;
    color: #ffffff;
`;

const CancelBtn = styled(Button)`
    background: #d9d9d9;
    color: #ffffff;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 4px;
`;
