import useDeleteProjectMutation from '@hooks/apis/mutations/project/useDeleteProjectMutation';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalPortal from '@utils/ModalPotal';
import useScrollLock from '@utils/useScrollLock';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from '../ModalCommon';

interface DeleteProjectProps {
    projectId: number;
    title: string;
    isClick: boolean;
    onClose: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ projectId, title, isClick, onClose }) => {
    const { mutate } = useDeleteProjectMutation(projectId);

    const handleDeleteProject = () => {
        mutate();
        onClose();
    };

    useScrollLock(isClick);

    return (
        <>
            {isClick && (
                <ModalPortal>
                    <ModalBlackOut onClick={onClose} />
                    <ModalContainer>
                        <Box>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <InfoCircleIcon sx={{ fontSize: '32px' }} />
                                    <PeojectName>{title}</PeojectName>
                                    <Title>해당 프로젝트를 삭제하겠습니까?</Title>
                                </div>
                                <ButtonsContainer style={{ alignSelf: 'flex-end' }}>
                                    <ConfirmBtn onClick={handleDeleteProject}>확인</ConfirmBtn>
                                    <CancelBtn onClick={onClose}>취소</CancelBtn>
                                </ButtonsContainer>
                            </div>
                        </Box>
                    </ModalContainer>
                </ModalPortal>
            )}
        </>
    );
};
export default DeleteProject;

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

const InfoCircleIcon = styled(InfoOutlinedIcon)`
    width: 32px;
    height: 32px;
    color: #eb5757;
`;

const CommonText = styled.span`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    line-height: normal;
`;

const PeojectName = styled(CommonText)`
    font-size: 28px;
    font-weight: 700;

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
`;

const Button = styled.button`
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
