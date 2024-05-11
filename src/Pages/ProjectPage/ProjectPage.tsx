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
import { useState } from 'react';
import MemberScheduleGrid from './Schedule/member/MemberScheduleGrid';
import ScheduleCalendar from './Schedule/scheduleCalendar';
import { ProjectProvider } from '#/hooks/context/projectContext';
import { DateProvider } from '#/hooks/context/dateContext';

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

const ProjectPage = () => {
    const [seeMemTime, setSeeMemTime] = useState(true);

    const toggleMemTime = () => {
        setSeeMemTime(!seeMemTime);
    };

    return (
        <ProjectProvider>
            <DateProvider>
                <GlobalStyle />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '32px',
                        width: '100vw',
                        margin: '0 auto',
                    }}
                >
                    <div>
                        <AfterLogin />
                        <Divider />
                        <ProjectInfo />
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
                                <ProfileList />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <TeamSchedule />
                                    <MySchedule />
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
                            {seeMemTime && <MemberScheduleGrid />}
                        </div>
                    </Box>
                </div>
                <div style={{ height: '400px' }}></div>
            </DateProvider>
        </ProjectProvider>
    );
};
export default ProjectPage;
