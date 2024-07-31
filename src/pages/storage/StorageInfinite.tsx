import { useStoredInfiniteQuery } from '@hooks/apis/queries/project/useStoredInfiniteQuery';
import { useSearch } from '@hooks/context/searchContext';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import StorageProjectList from './StorageProjectList';

const StorageInfinite = () => {
    const { keyword, searchData, setSize, setIsStored } = useSearch();

    const { data, fetchNextPage, hasNextPage } = useStoredInfiniteQuery(keyword);

    useEffect(() => {
        if (data?.pages[0]?.totalCount) {
            setSize(data.pages[0].totalCount);
        }
        setIsStored(true);
    }, [data, setSize, setIsStored]);

    const projects = keyword ? searchData || [] : data?.pages.flatMap((page) => page.data) || [];

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={() => !keyword && fetchNextPage()}
            hasMore={!keyword && !!hasNextPage}
            loader={<div key={0}>Loading...</div>}
        >
            <StorageProjectList projects={projects} />
        </InfiniteScroll>
    );
};

export default StorageInfinite;
