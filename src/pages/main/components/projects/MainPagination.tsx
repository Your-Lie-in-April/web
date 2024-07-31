import useProjectMainQuery from '@hooks/apis/queries/project/useProjectMainQuery';
import { useSearch } from '@hooks/context/searchContext';
import { useMainPaginationMutation } from '@hooks/useMainPaginationMutation';
import { useEffect } from 'react';
import styled from 'styled-components';
import Paging from './Paging';
import ProjectList from './ProjectList';

const MainPagination = () => {
    const memberId = Number(localStorage.getItem('member_id'));
    const { keyword, searchData, isSearching, page, setPage, setSize, setIsStored, totalPages } =
        useSearch();

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
        if (projectsData && projectsData.totalCount !== undefined) {
            setSize(Number(projectsData.totalCount));
            setIsStored(false);
        }
    }, [projectsData, setSize, setIsStored]);

    useEffect(() => {
        if (projectsData && !keyword) {
            updatePaginationData(projectsData);

            if (projectsData.data.length === 0 && mainCurrentPage > 0) {
                handleMainPageChange(mainCurrentPage - 1);
            }
        }
    }, [projectsData, keyword, mainCurrentPage, updatePaginationData, handleMainPageChange]);

    const handlePageChange = (newPage: number) => {
        if (keyword) {
            setPage(newPage);
        } else {
            handleMainPageChange(newPage);
        }
    };

    const displayProjects = keyword ? searchData : mainProjects;
    const displayTotalPages = keyword ? totalPages : mainTotalPages;
    const displayTotalCount = keyword ? searchData?.length || 0 : mainTotalCount;
    const displayCurrentPage = keyword ? page : mainCurrentPage;

    return (
        <PaginationBox>
            <ProjectList projects={displayProjects} isSearching={isSearching} />
            {displayTotalCount !== 0 && (
                <Paging
                    currentPage={displayCurrentPage + 1}
                    pageSize={6}
                    totalCount={displayTotalCount}
                    totalPages={displayTotalPages}
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
