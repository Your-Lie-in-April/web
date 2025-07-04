import { useAppDispatch, useAppSelector } from '@redux/config/hook';
import { RootState } from '@redux/config/store';
import {
    setIsSearching,
    setIsStored,
    setKeyword,
    setPage,
    setSearchData,
    setSize,
    setTotalPages,
} from '@redux/slice/search';
import { useEffect } from 'react';
import useSearchQuery from './apis/queries/project/useSearchQuery';

const useSearch = () => {
    const dispatch = useAppDispatch();
    const { keyword, page, size, isStored } = useAppSelector((state: RootState) => state.search);

    const userData = useAppSelector((state) => state.user.userData);
    const memberId = Number(userData?.memberId);

    const { data, isLoading } = useSearchQuery(memberId, keyword, page, size, isStored);

    useEffect(() => {
        dispatch(setIsSearching(isLoading));
    });

    useEffect(() => {
        if (keyword && data) {
            dispatch(setSearchData(data.data));
            dispatch(setTotalPages(data.totalPages));
        } else {
            dispatch(setSearchData(null));
        }
    }, [data, keyword, dispatch]);

    return {
        keyword,
        page,
        size,
        isStored,
        isSearching: isLoading,
        searchData: data?.data || null,
        totalPages: data?.totalPages || 0,
        setKeyword: (kw: string) => dispatch(setKeyword(kw)),
        setPage: (pg: number) => dispatch(setPage(pg)),
        setSize: (s: number) => dispatch(setSize(s)),
        setIsStored: (isStored: boolean) => dispatch(setIsStored(isStored)),
    };
};
export default useSearch;
