import useSearchQuery from '@hooks/apis/queries/project/useSearchQuery';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SearchContextType {
    keyword: string;
    setKeyword: (keyword: string) => void;
    searchData: any | null;
    isSearching: boolean;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const memberId = Number(localStorage.getItem('member_id'));

    const { data: searchData, isLoading: isSearching } = useSearchQuery(
        memberId,
        keyword,
        currentPage
    );

    const totalPages = searchData?.totalPages || 0;

    return (
        <SearchContext.Provider
            value={{
                keyword,
                setKeyword,
                searchData: keyword ? searchData?.data : null,
                isSearching,
                currentPage,
                setCurrentPage,
                totalPages,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
