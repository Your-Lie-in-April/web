import AfterLogin from '../Layouts/AfterLogin';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import ProjectInfo from './ProjectInfo';
import ProfileList from './ProfileList/ProfileList';
import MySchedule from './Schedule/my/MySchedule';
import TeamSchedule from './Schedule/team/TeamSchedule';
import Alarm from './Alarm';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import MemberScheduleGrid from './Schedule/member/MemberScheduleGrid';
import { useParams } from 'react-router-dom';
import { Http } from '#/constants/backendURL';
import { MemberEntity } from '#/Types/membertype';
import { ProjectEntity } from '#/Types/projecttype';
import { ProjectProvider } from '#/hooks/context/projectContext';
import { DateProvider } from '#/hooks/context/dateContext';
import ScheduleCalendar from './Schedule/schedulecalendar';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #FFFFFF;
    -ms-overflow-style: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Divider = styled.div`
    width: 100%;
    height: 20px;
    background-color: #212121;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    box-sizing: border-box;
`;

const MainBox = styled.div`
    display: flex;
    gap: 22px;
`;

const MemTimeBtn = styled.button`
    width: 176px;
    height: 40px;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: center;
    gap: 2px;

    border-radius: 30px;
    background: #212121;
    color: #ffffff;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .icon {
        width: 22px;
        height: 22px;
    }
`;

const ProjectPage: React.FC = () => {
    const [seeMemTime, setSeeMemTime] = useState(true);
    const [members, setMembers] = useState<MemberEntity[]>([]);
    const [projectData, setProjectData] = useState<ProjectEntity | null>(null);
    const { projectId } = useParams<{ projectId: string }>();
    const [isEditModal, setIsEditModal] = useState(false);

    const toggleMemTime = () => {
        setSeeMemTime(!seeMemTime);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchMember = async () => {
            try {
                const response = await fetch(
                    `${Http}/v1/projects/${projectId}/members`,
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
                console.log('멤버', data.data);
                setMembers(data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMember();
    }, [projectId]);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const fetchProjectData = async () => {
            const url = `${Http}/v1/projects/${projectId}`;
            const headers = {
                Accept: '*/*',
                Authorization: `Bearer ${accessToken}`,
            };

            try {
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error('데이터 가져오기 실패');
                }
                const data = await response.json();
                setProjectData(data.data);
                console.log('프로젝트 데이터:', data);
            } catch (error) {
                console.error('API 요청 중 에러 발생:', error);
            }
        };
        fetchProjectData();
    }, [projectId]);

    return (
        <ProjectProvider>
            <DateProvider>
                <GlobalStyle />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        width: '100%',
                    }}
                >
                    <div>
                        <AfterLogin />
                        <Divider />
                        <ProjectInfo projectData={projectData} />
                    </div>
                    <Box>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '24px',
                                alignItems: 'center',
                            }}
                        >
                            <MainBox>
                                <ProfileList
                                    projectId={projectId}
                                    members={members}
                                    projectData={projectData}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <TeamSchedule />
                                    <MySchedule
                                        isEditModal={isEditModal}
                                        setIsEditModal={setIsEditModal}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <ScheduleCalendar />
                                    <Alarm />
                                </div>
                            </MainBox>
                            <MemTimeBtn onClick={toggleMemTime}>
                                {seeMemTime
                                    ? '멤버 시간표 닫기'
                                    : '멤버 시간표 열기'}
                                {seeMemTime ? (
                                    <ArrowDropUpIcon className="icon" />
                                ) : (
                                    <ArrowDropDownIcon className="icon" />
                                )}
                            </MemTimeBtn>
                            {seeMemTime && (
                                <MemberScheduleGrid
                                    projectId={projectId}
                                    members={members}
                                />
                            )}
                        </div>
                    </Box>
                </div>
                <div style={{ height: '400px' }}></div>
            </DateProvider>
        </ProjectProvider>
    );
};
export default ProjectPage;
