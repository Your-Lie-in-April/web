import { Http } from '#/constants/backendURL';
import { ProjectThumbnailResponse } from '#/types/projectType';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AfterLogin from '../Layouts/AfterLogin';
import Search from '../Layouts/Search';
import GraphicIcons from './Icon/GraphicIcons';
import StorageProjectList from './StorageProjectList';

const GlobalStyle = createGlobalStyle`
body {
  width : 100%;
  min-width : 1366px;
  min-height : 1573px;
  margin: 0 auto;
  background-color: #212121;
  -ms-overflow-style: none;
}

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
    color: #ffffff;
    text-align: center;
    font-size: 42px;

    font-weight: 700;
    line-height: normal;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 130px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 49px;
    align-items: center;
    z-index: 1;
`;

const InnerContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const Spacer = styled.div`
    width: 100vw;
    height: 172px;
`;

const StoragePage = () => {
    const [storelist, setStoreList] = useState<ProjectThumbnailResponse[]>([]);
    const [searchResults, setSearchResults] = useState<ProjectThumbnailResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size] = useState<number>(9);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastProjectRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        setPage((prevPage) => {
                            if (prevPage < totalPages - 1) {
                                return prevPage + 1;
                            }
                            return prevPage;
                        });
                    }
                },
                {
                    rootMargin: '0px 500px',
                    threshold: 0.1,
                }
            );
            if (node) observer.current.observe(node);
        },
        [hasMore, totalPages]
    );

    const fetchStoredProjects = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                const response = await fetch(
                    `${Http}/v1/projects/stored?page=${page}&size=${size}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: '*/*',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                if (!response.ok) {
                    console.log('failed to fetch storage projects');
                    return;
                }
                const data = await response.json();
                console.log(data.data.data);
                setTotalPages(data.data.totalPages);
                if (page === 0) {
                    setStoreList(data.data.data);
                    setSearchResults(data.data.data);
                } else {
                    setStoreList((prevProjects) => [...prevProjects, ...data.data.data]);
                    setSearchResults((prevProjects) => [...prevProjects, ...data.data.data]);
                }
            }
        } catch (error) {
            console.error('업데이트 실패:', error);
        }
    };

    useEffect(() => {
        if (hasMore) {
            fetchStoredProjects();
        }
    }, [page, size, hasMore]);

    useEffect(() => {
        setHasMore(page < totalPages - 1);
    }, [page, totalPages]);

    // 검색기능
    const handleSearch = (query: string) => {
        const searchProjects = storelist.filter((project) =>
            project.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(searchProjects);
    };
    return (
        <>
            <GlobalStyle />
            <GraphicIcons />
            <Container>
                <AfterLogin />
                <Content>
                    <InnerContent>
                        <Title>프로젝트 보관함</Title>
                        <Search onSearch={handleSearch} />
                    </InnerContent>
                    <StorageProjectList projects={searchResults} lastProjectRef={lastProjectRef} />
                </Content>
            </Container>
            <Spacer />
        </>
    );
};

export default StoragePage;
