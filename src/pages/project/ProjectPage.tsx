import useAllMemberInfoQuery from '@hooks/apis/queries/member/useAllMemberInfoQuery';
import { DateProvider } from '@hooks/context/dateContext';
import { ProjectProvider } from '@hooks/context/projectContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Layout from '@pages/layouts/Layout';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Alarm from './Alarm';
import ProjectInfo from './info/ProjectInfo';
import ProfileList from './profiles/ProfileList';
import MemberScheduleGrid from './schedules/member/MemberScheduleGrid';
import MySchedule from './schedules/my/MySchedule';
import ScheduleCalendar from './schedules/ScheduleCalendar';
import TeamSchedule from './schedules/team/TeamSchedule';

const ProjectPage: React.FC = () => {
    const [seeMemTime, setSeeMemTime] = useState(true);
    const [isEditModal, setIsEditModal] = useState(false);

    const toggleMemTime = () => {
        setSeeMemTime(!seeMemTime);
    };

    const { projectId } = useParams();
    const { data: membersData } = useAllMemberInfoQuery(Number(projectId));

    return (
        <ProjectProvider>
            <DateProvider>
                <GlobalStyle />
                <Layout>
                    <Divider />
                    <ProjectInfo />
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
                                <ProfileList />
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
                            {membersData && membersData.length > 1 && (
                                <>
                                    <MemTimeBtn onClick={toggleMemTime}>
                                        {seeMemTime ? '멤버 시간표 닫기' : '멤버 시간표 열기'}
                                        {seeMemTime ? (
                                            <ArrowDropUpIcon className='icon' />
                                        ) : (
                                            <ArrowDropDownIcon className='icon' />
                                        )}
                                    </MemTimeBtn>
                                    {seeMemTime && <MemberScheduleGrid />}
                                </>
                            )}
                        </div>
                    </Box>
                    <div style={{ height: '400px' }}></div>
                </Layout>
            </DateProvider>
        </ProjectProvider>
    );
};
export default ProjectPage;

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
    margin-top: 32px;
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
