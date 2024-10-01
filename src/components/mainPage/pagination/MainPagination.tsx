import useProjectMainQuery from '@hooks/apis/queries/project/useProjectMainQuery';
import { useMainPaginationMutation } from '@hooks/useMainPaginationMutation';
import { useEffect } from 'react';
import styled from 'styled-components';
import Paging from './Paging';
import ProjectList from './ProjectList';

const MainPagination = () => {
    const memberId = Number(localStorage.getItem('member_id'));

    const {
        currentPage: mainCurrentPage,
        totalPages: mainTotalPages,
        projects: mainProjects,
        totalCount: mainTotalCount,
        handlePageChange: handleMainPageChange,
        updatePaginationData,
    } = useMainPaginationMutation(memberId);

    const { data: projectsData } = useProjectMainQuery(memberId, mainCurrentPage);

    useEffect(() => {
        if (projectsData) {
            updatePaginationData(projectsData);

            if (projectsData.data.length === 0 && mainCurrentPage > 0) {
                handleMainPageChange(mainCurrentPage - 1);
            }
        }
    }, [projectsData, mainCurrentPage, updatePaginationData, handleMainPageChange]);

    const displayProjects = mainProjects || [];
    const totalPages = mainTotalPages || 0;
    const totalCount = mainTotalCount || 0;

    return (
        <PaginationBox>
            <ProjectList projects={displayProjects} />
            {totalPages !== 0 && (
                <Paging
                    currentPage={mainCurrentPage + 1}
                    pageSize={6}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    onPageChange={handleMainPageChange}
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
