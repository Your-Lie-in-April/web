import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfoEdit from './infoedit';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${(props) => props.color || '#d9d9d9'};
  box-sizing: border-box;
  padding-top: 28px;
`;

const ProjectInfoDiv = styled.div`
  min-width: 900px;
  height: 172px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  margin: auto;
`;

const CommonText = styled.div`
  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const SettingDiv = styled.div`
  position: absolute;
  bottom: 16px;
  width: 221px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 20px;
  background: #633ae2;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;

const EditIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='18'
    height='18'
    viewBox='0 0 18 18'
    fill='none'
  >
    <g clipPath='url(#clip0_906_19932)'>
      <path
        d='M3.89112 13.8196C3.9313 13.8196 3.97148 13.8156 4.01166 13.8096L7.39067 13.2169C7.43085 13.2089 7.46902 13.1908 7.49715 13.1607L16.013 4.64483C16.0316 4.62624 16.0464 4.60417 16.0565 4.57987C16.0666 4.55556 16.0717 4.52951 16.0717 4.5032C16.0717 4.47689 16.0666 4.45084 16.0565 4.42653C16.0464 4.40223 16.0316 4.38016 16.013 4.36157L12.6742 1.02072C12.636 0.982553 12.5858 0.962463 12.5315 0.962463C12.4773 0.962463 12.4271 0.982553 12.3889 1.02072L3.87304 9.53657C3.84291 9.5667 3.82483 9.60287 3.81679 9.64304L3.22416 13.0221C3.20461 13.1297 3.2116 13.2404 3.2445 13.3448C3.2774 13.4491 3.33524 13.5438 3.413 13.6207C3.54558 13.7493 3.71233 13.8196 3.89112 13.8196ZM5.24514 10.316L12.5315 3.03166L14.0041 4.5042L6.71768 11.7886L4.93175 12.104L5.24514 10.316ZM16.3927 15.5071H1.60697C1.25139 15.5071 0.964111 15.7944 0.964111 16.15V16.8732C0.964111 16.9616 1.03643 17.0339 1.12483 17.0339H16.8748C16.9632 17.0339 17.0355 16.9616 17.0355 16.8732V16.15C17.0355 15.7944 16.7483 15.5071 16.3927 15.5071Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_906_19932'>
        <rect width='18' height='18' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const SettingBtn = styled.button`
  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  gap: 4px;
  border-radius: 20px;
  padding: 0;
  margin: 0;
  background: transparent;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
interface ProjectInfoDetailProps {
  onClick: () => void;
  projectData: ProjectEntity | null;
}
export const ProjectInfoDetail: React.FC<ProjectInfoDetailProps> = ({
  onClick,
  projectData,
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isStored, setIsStored] = useState<boolean>(false);
  const handleStore = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${Http}/v1/members/storage/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          credentials: 'include',
        },
        body: JSON.stringify({ projectId: projectId }),
      });
      if (!response.ok) throw new Error('뭔가 이상');
      setIsStored(true);
      window.alert('보관하였습니다.');
      const result = await response.json();
      console.log('보관함 결과:', result);
      window.location.reload();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };
  return (
    <Container color={projectData?.color}>
      <ProjectInfoDiv>
        <CommonText style={{ fontSize: '42px', fontWeight: '700' }}>
          {projectData?.title}
        </CommonText>
        <CommonText>{projectData?.description}</CommonText>
        <div style={{ width: '100%', display: 'flex' }}>
          <div
            style={{
              justifyContent: 'flex-start',
              flex: '0 0 75%',
            }}
          />
          <div
            style={{
              justifyContent: 'center',
              flex: '0 0 25%',
            }}
          >
            <SettingDiv>
              <SettingBtn onClick={onClick}>
                <EditIcon />
                커버 수정
              </SettingBtn>
              <SettingBtn onClick={handleStore}>
                <InboxOutlinedIcon style={{ fontSize: '18px' }} />
                프로젝트 보관
              </SettingBtn>
            </SettingDiv>
          </div>
        </div>
      </ProjectInfoDiv>
    </Container>
  );
};
interface ProjectDetailProps {
  projectData: ProjectEntity | null;
}
const ProjectInfo: React.FC<ProjectDetailProps> = ({ projectData }) => {
  const [editCover, setEditCover] = useState(false);

  return (
    <>
      {editCover ? (
        <InfoEdit projectData={projectData} setEditCover={setEditCover} />
      ) : (
        <ProjectInfoDetail
          onClick={() => setEditCover(true)}
          projectData={projectData}
        />
      )}
    </>
  );
};

export default ProjectInfo;
