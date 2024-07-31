import useSearchQuery from '@hooks/apis/queries/project/useSearchQuery';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SearchContextType {
    keyword: string;
    setKeyword: (keyword: string) => void;
    searchData: any | null;
    isSearching: boolean;
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    size: number;
    setSize: (size: number) => void;
    isStored: boolean;
    setIsStored: (isStored: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [isStored, setIsStored] = useState(false);
    const memberId = Number(localStorage.getItem('member_id'));

    const { data: searchData, isLoading: isSearching } = useSearchQuery(
        memberId,
        keyword,
        page,
        size,
        isStored
    );

    const totalPages = searchData?.totalPages || 0;

    return (
        <SearchContext.Provider
            value={{
                keyword,
                setKeyword,
                searchData: keyword ? searchData?.data : null,
                isSearching,
                page,
                setPage,
                totalPages,
                size,
                setSize,
                isStored,
                setIsStored,
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
