import { useSearch } from '@hooks/context/searchContext';
import React from 'react';
import MainPagination from './MainPagination';
import SearchPagination from './SearchPagination';

const Pagination: React.FC = () => {
    const { keyword } = useSearch();

    return keyword ? <SearchPagination /> : <MainPagination />;
};

export default Pagination;
