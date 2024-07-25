import { ProjectPinResponse } from '@/types/projectType';
import { ScheduleAllMembersResDto } from '@/types/scheduleType';
import usePatchPinnedMutation from '@hooks/apis/mutations/member/usePatchPinnedMutation';
import useProjectPinnedQuery from '@hooks/apis/queries/project/useProjectPinnedQuery';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PinnedSchedule from './PinnedSchedule';

const Pinned: React.FC = () => {
    const navigation = useNavigate();
    const [pinnedProjects, setPinnedProjects] = useState<ProjectPinResponse | null>(null);
    const [pinSchedule, setPinSchedule] = useState<ScheduleAllMembersResDto | null>(
        pinnedProjects?.schedule ?? null
    );
    const memberId = localStorage.getItem('member_id');
    const { data: getPinProject } = useProjectPinnedQuery(Number(memberId));
    useEffect(() => {
        if (getPinProject && getPinProject.length > 0) {
            setPinnedProjects(getPinProject[0]);
            setPinSchedule(getPinProject[0].schedule);
        } else {
            setPinnedProjects(null);
            setPinSchedule(null);
        }
    }, [getPinProject]);

    const { mutate: handlePinned } = usePatchPinnedMutation(pinnedProjects?.projectId ?? 0);
    const handlePinButtonClick = () => {
        handlePinned();
    };
    const handleNavigation = () => {
        navigation(`/project/${pinnedProjects?.projectId}`);
    };

    return pinnedProjects ? (
        <PinnedBox onClick={handleNavigation}>
            <FlexColumn>
                <StyledButton>
                    <PushPinOutlinedIcon
                        sx={{ fontSize: 36 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePinButtonClick();
                        }}
                    />
                </StyledButton>
                <ProjectBox>
                    <TextDiv>
                        <ProjectText>{pinnedProjects.title}</ProjectText>
                        <DetailText>멤버 {pinnedProjects.memberCount}명</DetailText>
                        <DetailText>
                            프로젝트 기간
                            <span />
                            {dayjs(pinnedProjects.startDate).format('YYYY.MM.DD')} ~{' '}
                            {dayjs(pinnedProjects.endDate).format('YYYY.MM.DD')}
                        </DetailText>
                    </TextDiv>
                    <PinnedSchedule scheduleData={pinSchedule} />
                </ProjectBox>
            </FlexColumn>
        </PinnedBox>
    ) : (
        <EmptyPinnedBox>
            <EmptyTitle>고정된 프로젝트가 없습니다</EmptyTitle>
            <EmptySubtitle>프로젝트 중 주요한 프로젝트의 경우 핀으로 고정해 보세요</EmptySubtitle>
        </EmptyPinnedBox>
    );
};
export default Pinned;

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

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProjectBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    align-self: flex-start;
    align-items: flex-start;
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
    width: 192px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    align-self: flex-end;
`;

const ProjectText = styled.span`
    color: #ffffff;
    font-family: 'Pretendard';
    font-size: 32px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const DetailText = styled.span`
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

const EmptyPinnedBox = styled(PinnedBox)`
    cursor: default;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
    gap: 60px;
    color: #d9d9d9;
`;

const EmptyTitle = styled.div`
    font-size: 24px;
    font-weight: 800;
`;

const EmptySubtitle = styled.div`
    font-size: 20px;
    font-weight: 500;
`;
