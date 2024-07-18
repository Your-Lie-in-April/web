import { ProjectThumbnailResponse } from '@/types/projectType';
import usePatchPinnedMutation from '@hooks/apis/mutations/member/usePatchPinnedMutation';
import usePatchStoredMutation from '@hooks/apis/mutations/member/usePatchStoredMutation';
import CancelIcon from '@mui/icons-material/Cancel';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import LeaveProject from '@pages/modal/project/LeaveProject';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ProjectProps {
    project: ProjectThumbnailResponse;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleMoreBtn = () => {
        setShowMore(!showMore);
    };

    const openLeaveModal = () => {
        setIsLeaveModalOpen(true);
    };

    const closeLeaveModal = () => {
        setIsLeaveModalOpen(false);
    };

    const { mutate: handlePinned } = usePatchPinnedMutation(project.projectId);
    const { mutate: handleStored } = usePatchStoredMutation(project.projectId);

    return (
        <ProjectBox
            style={{ backgroundColor: project.color }}
            $coverImageUrl={project.coverImageUrl}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <MoreDiv>
                    {showMore && (
                        <>
                            <StyledButton onClick={openLeaveModal}>
                                <CancelBtn sx={{ fontSize: 36 }} />
                            </StyledButton>
                            <MoreBox>
                                <MoreItem onClick={() => handlePinned()}>
                                    <PushPinOutlinedIcon sx={{ fontSize: 18 }} />
                                    <MoreText>상단고정</MoreText>
                                </MoreItem>
                                <MoreItem onClick={() => handleStored()}>
                                    <InboxOutlinedIcon sx={{ fontSize: 18 }} />
                                    <MoreText>보관함이동</MoreText>
                                </MoreItem>
                            </MoreBox>
                        </>
                    )}
                    <StyledButton onClick={toggleMoreBtn}>
                        <StyledMoreBtn sx={{ fontSize: 32 }} />
                    </StyledButton>
                </MoreDiv>
                <TextBox onClick={() => navigate(`/project/${project.projectId}`)}>
                    <ProjectName>{project.title}</ProjectName>
                    <DetailText>{project.description}</DetailText>
                </TextBox>
            </div>
            <LeaveProject
                projectId={project.projectId}
                projectTitle={project.title}
                onClose={closeLeaveModal}
                isOpen={isLeaveModalOpen}
            />
        </ProjectBox>
    );
};
export default Project;

interface MoreTextProps extends React.HTMLAttributes<HTMLDivElement> {
    isMove?: boolean;
}

interface ProjectBoxProps {
    $color?: string;
    $coverImageUrl?: string | null;
}

const ProjectBox = styled.div<ProjectBoxProps>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    height: 300px;
    background: ${(props) =>
        props.$coverImageUrl
            ? `url(${props.$coverImageUrl}) no-repeat center/cover`
            : props.$color
            ? `#${props.$color}`
            : '#b79fff'};
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    color: #ffffff;
    position: relative;
`;

const TextBox = styled.div`
    width: 300px;
    height: 96px;
    border-radius: 0px 0px 16px 16px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
    align-items: flex-start;
    gap: 8px;

    color: #000000;
    font-family: 'Pretendard';
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
    cursor: pointer;
`;

const ProjectName = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const DetailText = styled.div`
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: pre-wrap;
    word-break: break-word;
`;

const StyledButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    &:focus {
        border: none;
        outline: none;
    }
`;

const StyledMoreBtn = styled(MoreVertIcon)`
    color: #000000;
    width: 18px;
    height: 18px;
`;

const MoreDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

const MoreBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 36px;
    border-radius: 6px;
    background-color: #ffffff;
    color: #7d7d7d;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-sizing: border-box;
    padding: 4px 8px;
`;

const MoreItem = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7d7d7d;
    border: none;
    padding: 0;
    cursor: pointer;
    &:focus {
        border: none;
        outline: none;
    }
`;

const MoreText = styled.div<MoreTextProps>`
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 10px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
    letter-spacing: ${({ isMove }) => (isMove ? '-1.2px' : 'normal')};
`;

const CancelBtn = styled(CancelIcon)`
    position: absolute;
    top: 8px;
    right: 8px;
    color: #ffffff;
    width: 36px;
    height: 36px;
`;
