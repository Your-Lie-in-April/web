import { ProjectThumbnailInfo } from '@/types/projectType';
import usePatchStoredMutation from '@hooks/apis/mutations/member/usePatchStoredMutation';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LeaveOrDeleteProject from '@pages/modal/project/LeaveOrDeleteProject';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StorageProject = ({ project }: { project: ProjectThumbnailInfo }) => {
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

    const { mutate: handleStored } = usePatchStoredMutation(project.projectId);

    const onProjectClick = () => {
        navigate(`/project/${project.projectId}`);
    };

    return (
        <>
            <ProjectBox
                onClick={onProjectClick}
                $color={project.color}
                $coverImageUrl={project.thumbnailUrl}
            >
                {showMore && (
                    <MoreBox>
                        <MoreWrapper>
                            <MoreItem
                                onClick={(event) => {
                                    handleStored();
                                    event.stopPropagation();
                                }}
                            >
                                <RestartAltIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
                                <MoreText>보관 취소</MoreText>
                            </MoreItem>
                            <MoreItem
                                onClick={(event) => {
                                    openLeaveModal();
                                    event.stopPropagation();
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: 48, color: '#F1F1F1' }} />
                                <MoreText>삭제하기</MoreText>
                            </MoreItem>
                        </MoreWrapper>
                    </MoreBox>
                )}
                <DetailBox>
                    <MoreDiv>
                        <MoreButton
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleMoreBtn();
                            }}
                        >
                            <StyledMoreBtn sx={{ fontSize: 32 }} />
                        </MoreButton>
                    </MoreDiv>
                    <TextBox>
                        <ProjectName>{project.title}</ProjectName>
                        <DetailText>{project.description}</DetailText>
                    </TextBox>
                </DetailBox>
            </ProjectBox>
            {isLeaveModalOpen && (
                <LeaveOrDeleteProject
                    projectId={project.projectId}
                    projectTitle={project.title}
                    onClose={closeLeaveModal}
                    isOpen={isLeaveModalOpen}
                />
            )}
        </>
    );
};

export default StorageProject;

const isValidValue = (value: string | null | undefined): boolean => {
    return value !== null && value !== undefined && value !== '';
};

const ProjectBox = styled.div<{ $color: string | null; $coverImageUrl: string | null }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    height: 300px;
    background: ${(props) =>
        isValidValue(props.$coverImageUrl)
            ? `url(${props.$coverImageUrl}) no-repeat center/cover`
            : isValidValue(props.$color)
            ? `${props.$color}`
            : '#b79fff'};
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    color: #ffffff;
    position: relative;
    cursor: pointer;
`;

const DetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
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
    font-style: normal;
    line-height: normal;
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

const MoreButton = styled.button.attrs({ type: 'button' })`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 20;

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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #7d7d7d;
    box-sizing: border-box;
    padding-top: 69px;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.3);
`;

const MoreWrapper = styled.div`
    display: flex;
    gap: 30px;
    justify-content: center;
`;

const MoreItem = styled.button.attrs({ type: 'button' })`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    color: #7d7d7d;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    &:focus {
        border: none;
        outline: none;
    }
`;

const MoreText = styled.div`
    color: #f1f1f1;
    font-weight: 400;
    font-size: 12px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;
