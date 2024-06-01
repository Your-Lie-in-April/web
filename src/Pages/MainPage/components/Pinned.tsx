import styled from 'styled-components';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { useUserContext } from '../MainPage';
import { useEffect, useState } from 'react';
import { PinProjectResponse } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';
import { useNavigate } from 'react-router-dom';
const PinnedBox = styled.div`
  width: 950px;
  height: 400px;
  background-color: #633ae2;
  border-radius: 20px;
  color: #ffffff;
  padding: 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-self: flex-start;
  align-items: flex-start;
`;

//임시 스케줄 박스
const ScheduleBox = styled.div`
  width: 681px;
  height: 300px;
  border-radius: 20px;
  background: #fff;
`;

const StyledButton = styled.button`
  width: 36px;
  height: 36px;

  background: none;
  color: #ffffff;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  align-self: flex-end;
`;

const ProjectText = styled.text`
  color: #ffffff;
  font-family: 'Pretendard';
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const DetailText = styled.text`
  color: #ffffff;
  font-family: 'Pretendard';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Pinned: React.FC = () => {
  const { userData } = useUserContext();
  const navigation = useNavigate();
  const [pinnedProjects, setPinnedProjects] =
    useState<PinProjectResponse | null>(null);
  const [pinnedId, setPinnedId] = useState();
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const memberId = localStorage.getItem('member_id');

    const fetchPinnedProjects = async () => {
      try {
        const response = await fetch(
          `${Http}/v1/projects/members/${memberId}/pin`,
          {
            method: 'GET',
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch pinned projects');
        }

        const data = await response.json();
        console.log('설정된거', data);
        setPinnedProjects(data.data[0]);
        setPinnedId(data.data[0].projectId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPinnedProjects();
  }, [userData]);

  const handlePin = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const url = `${Http}/v1/members/pin/${pinnedId}`;
      console.log('Request URL:', url);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          credentials: 'include',
        },
      });
      console.log('Response:', response);

      if (!response.ok) throw new Error('뭔가 이상');
      const result = await response.json();
      console.log('상단 고정 결과:', result);
      window.alert('핀 설정 해제에 성공했습니다.');
      window.location.reload();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const handleNavigation = () => {
    navigation(`/project/${pinnedProjects?.projectId}`);
  };

  return pinnedProjects ? (
    <PinnedBox onClick={handleNavigation}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledButton onClick={(e) => e.stopPropagation()}>
          <PushPinOutlinedIcon sx={{ fontSize: 36 }} onClick={handlePin} />
        </StyledButton>
        <ProjectBox>
          <TextDiv>
            <ProjectText>
              <br />
              {pinnedProjects.title}
            </ProjectText>
            <DetailText>멤버 {pinnedProjects.memberCount}명</DetailText>
            <DetailText>
              프로젝트 기간
              <span />
              {pinnedProjects.startDate} ~ {pinnedProjects.endDate}
            </DetailText>
          </TextDiv>
          <ScheduleBox />
        </ProjectBox>
      </div>
    </PinnedBox>
  ) : (
    <PinnedBox style={{ cursor: 'default' }} />
  );
};
export default Pinned;
