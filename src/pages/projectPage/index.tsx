import ProjectFormLayout from '@components/common/ProjectFormLayout';
import { Layout } from '@components/layout';
import { Alarm, ProjectInfo, ScheduleCalendar } from '@components/projectPage';
import { ProfileList } from '@components/projectPage/Profiles';
import { MemberScheduleGrid, MySchedule, TeamSchedule } from '@components/projectPage/Schedules';
import useAllMemberInfoQuery from '@hooks/apis/queries/member/useAllMemberInfoQuery';
import useProjectInfoQuery from '@hooks/apis/queries/project/useProjectInfoQuery';
import { DateProvider } from '@hooks/context/dateContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import { setProjectData } from '@redux/slice/project';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const ProjectPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [seeMemTime, setSeeMemTime] = useState(true);
    const [isEditModal, setIsEditModal] = useState(false);

    const toggleMemTime = () => {
        setSeeMemTime(!seeMemTime);
    };

    const { projectId } = useParams();
    const { data: membersData } = useAllMemberInfoQuery(Number(projectId));
    const { data: projectData } = useProjectInfoQuery(Number(projectId));

    const { isEdit } = useAppSelector((state: RootState) => state.mode);

    useEffect(() => {
        if (projectData) {
            dispatch(setProjectData(projectData));
        }
    }, [projectId, dispatch, projectData]);

    return (
        <DateProvider>
            {isEdit ? (
                <ProjectFormLayout />
            ) : (
                <>
                    <GlobalStyle />
                    <Layout>
                        <Divider />
                        <ProjectInfo />
                        <Box>
                            <OuterColumn>
                                <MainBox>
                                    <ProfileList />
                                    <InnerColumn>
                                        <TeamSchedule />
                                        <MySchedule
                                            isEditModal={isEditModal}
                                            setIsEditModal={setIsEditModal}
                                        />
                                    </InnerColumn>
                                    <InnerColumn>
                                        <ScheduleCalendar />
                                        <Alarm />
                                    </InnerColumn>
                                </MainBox>
                                {membersData && membersData.length > 1 && (
                                    <>
                                        <MemTimeBtn onClick={toggleMemTime}>
                                            {seeMemTime ? (
                                                <>
                                                    멤버 시간표 닫기 <ArrowDropUpIcon />
                                                </>
                                            ) : (
                                                <>
                                                    멤버 시간표 열기 <ArrowDropDownIcon />
                                                </>
                                            )}
                                        </MemTimeBtn>
                                        {seeMemTime && <MemberScheduleGrid />}
                                    </>
                                )}
                            </OuterColumn>
                        </Box>
                        <div style={{ height: '400px' }} />
                    </Layout>
                </>
            )}
        </DateProvider>
    );
};
export default ProjectPage;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #FFFFFF; 
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

const OuterColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
`;

const InnerColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    .icon {
        width: 22px;
        height: 22px;
    }
`;
