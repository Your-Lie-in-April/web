import { Http } from '#/constants/backendURL';
import ModalPortal from '#/utils/ModalPotal';
import useScrollLock from '#/utils/useScrollLock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from 'styled-components';
import { ModalBlackOut, ModalContainer } from './ModalCommon';

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

const CommonText = styled.text`
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
  font-family: Pretendard;
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

interface DeleteProjectProps {
  projectId: number;
  title: string;
  isClick: boolean;
  onClose: () => void;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({
  projectId,
  title,
  isClick,
  onClose,
}) => {
  const deleteProject = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const response = await fetch(`${Http}/v1/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            Accept: '*/*',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          console.log('failed to delete storage project');
        }
        const data = await response.json();
        console.log('삭제삭제삭제', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirmDelete = () => {
    deleteProject();
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
                  <ConfirmBtn onClick={onConfirmDelete}>확인</ConfirmBtn>
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
