import useProjectMainQuery from '@hooks/apis/queries/project/useProjectMainQuery';
import { useMainPaginationMutation } from '@hooks/useMainPaginationMutation';
import { useEffect } from 'react';
import styled from 'styled-components';
import Paging from './Paging';
import ProjectList from './ProjectList';

const MainPagination = () => {
    const memberId = Number(localStorage.getItem('member_id'));
    const {
        currentPage,
        totalPages,
        projects,
        totalCount,
        handlePageChange,
        updatePaginationData,
    } = useMainPaginationMutation(memberId);

    const { data: projectsData } = useProjectMainQuery(memberId, currentPage);

    useEffect(() => {
        if (projectsData) {
            updatePaginationData(projectsData);

            if (projectsData.data.length === 0 && currentPage > 0) {
                handlePageChange(currentPage - 1);
            }
        }
    }, [projectsData, updatePaginationData, currentPage, handlePageChange]);

    return (
        <PaginationBox>
            <ProjectList projects={projects} />
            {totalCount !== 0 && (
                <Paging
                    currentPage={currentPage + 1}
                    pageSize={6}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </PaginationBox>
    );
};

export default MainPagination;

const PaginationBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 27px;
`;
