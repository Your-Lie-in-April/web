import AfterLogin from '../Layouts/AfterLogin';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import ProjectInfo from './ProjectInfo';
import ProfileList from './ProfileList/ProfileList';
import MySchedule from './Schedule/MySchedule';
import TeamSchedule from './Schedule/TeamSchedule';
import Alarm from './Alarm';
import MemberSchedule from './Schedule/MemberSchedule';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import MemberScheduleGrid from './Schedule/MemberScheduleGrid';
import Info from '../ProjectMakePage/Info';
import Project from '../MainPage/components/Project';
import ProjectCalendar from '../ProjectMakePage/projectcalendar';
const GlobalStyle = createGlobalStyle`
  body {
    width : 100%;
    min-width : 1366px;
    margin: 0 auto;
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
const StyledCalendarWrapper = styled.div`
    .react-calendar__tile {
        padding: 3px;
        font-size: 24px;
    }
    &--active {
        background-color: inherit;
        border-radius: 0;
    }
    .react-calendar {
        width: 290px;
        height: 294px;
        border-radius: 10px;
        background: #fbfbfb;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
        font-family: Arial, Helvetica, sans-serif;
        line-height: normal;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font: inherit;
        font-size: 0.75em;
        font-weight: bold;
        gap: 2px;
        width: 279px;
    }
    .react-calendar__navigation {
        display: flex;
        height: 22px;
        margin-bottom: 1em;
    }
    .react-calendar__viewContainer {
        pointer-events: none;
    }
`;
const ProjectPage = () => {
    const [seeMemTime, setSeeMemTime] = useState(true);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const toggleMemTime = () => {
        setSeeMemTime(!seeMemTime);
    };

    return (
        <>
            <GlobalStyle />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
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
                                <div
                                    style={{
                                        position: 'relative',
                                        left: '-50px',
                                    }}
                                >
                                    <StyledCalendarWrapper
                                        style={{ width: '20px' }}
                                    >
                                        <ProjectCalendar
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectRange={false}
                                        />
                                    </StyledCalendarWrapper>
                                </div>
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
        </>
    );
};
export default ProjectPage;
