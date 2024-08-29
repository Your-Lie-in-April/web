import { useSearchInfiniteQuery } from '@hooks/apis/queries/project/useSearchInfiniteQuery ';
import { useStoredInfiniteQuery } from '@hooks/apis/queries/project/useStoredInfiniteQuery';
import { useSearch } from '@hooks/context/searchContext';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import StorageProjectList from './StorageProjectList';

const StorageInfinite = () => {
    const memberId = Number(localStorage.getItem('member_id'));
    const { keyword, setSize, setIsStored } = useSearch();

    const {
        data: storedData,
        fetchNextPage: fetchNextStoredPage,
        hasNextPage: hasNextStoredPage,
    } = useStoredInfiniteQuery(keyword);

    const {
        data: searchData,
        fetchNextPage: fetchNextSearchPage,
        hasNextPage: hasNextSearchPage,
    } = useSearchInfiniteQuery(memberId, keyword);

    useEffect(() => {
        setSize(9);
        setIsStored(true);
    }, [storedData, setSize, setIsStored]);

    const projects = keyword
        ? searchData?.pages.flatMap((page) => page.data) || []
        : storedData?.pages.flatMap((page) => page.data) || [];

    const loadMore = () => {
        if (keyword) {
            fetchNextSearchPage();
        } else {
            fetchNextStoredPage();
        }
    };

    const hasMore = keyword ? hasNextSearchPage : hasNextStoredPage;

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<div key={0} />}
        >
            <StorageProjectList projects={projects} />
        </InfiniteScroll>
    );
};

export default StorageInfinite;
