import useSearchQuery from '@hooks/apis/queries/project/useSearchQuery';
import { useSearch } from '@hooks/context/searchContext';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Paging from './Paging';
import ProjectList from './ProjectList';

const SearchPagination: React.FC = () => {
    const { keyword, page, setPage, size, setSize, setIsStored } = useSearch();

    const memberId = Number(localStorage.getItem('member_id'));

    const { data: searchData } = useSearchQuery(memberId, keyword, page, size, false);

    useEffect(() => {
        setSize(6);
        setIsStored(false);
    }, [setSize, setIsStored]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage - 1);
    };

    const displayProjects = searchData?.data || [];
    const totalPages = searchData?.totalPages || 0;
    const totalCount = searchData?.totalCount || 0;

    return (
        <PaginationBox>
            <ProjectList projects={displayProjects} />
            {totalCount !== 0 && (
                <Paging
                    currentPage={page + 1}
                    pageSize={size}
                    totalCount={totalCount}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </PaginationBox>
    );
};

export default SearchPagination;

const PaginationBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 27px;
`;
