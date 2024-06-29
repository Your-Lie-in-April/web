import { Http } from '#/constants/backendURL';
import { ProjectThumbnailResponse } from '#/Types/projecttype';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StoragePage = () => {
  const [storelist, setStoreList] = useState<ProjectThumbnailResponse[]>([]);
  const [searchResults, setSearchResults] = useState<
    ProjectThumbnailResponse[]
  >([]);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(9);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  const lastProjectRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
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
        }
        const data = await response.json();
        console.log(data);
        if (page === 0) {
          setStoreList(data.data);
          setSearchResults(data.data);
        } else {
          setStoreList((prevProjects) => [...prevProjects, ...data.data]);
          setSearchResults((prevProjects) => [...prevProjects, ...data.data]);
        }
        setHasMore(data.data.length > 0);
      } 
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  useEffect(() => {
    fetchStoredProjects();
  }, [page, size]);

  const handleSearch = (query: string) => {
    const searchProjects = storelist.filter((project) =>
      project.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(searchProjects);
  };

  return (
    <>
      <GlobalStyle />
      <>
        <GraphicIcons />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '130px',
          }}
        >
          <AfterLogin />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '49px',
              alignItems: 'center',

              zIndex: '1',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '48px',
              }}
            >
              <Title>프로젝트 보관함</Title>
              <Search onSearch={handleSearch} />
            </div>
            <StorageProjectList
              projects={searchResults}
              lastProjectRef={lastProjectRef}
            />
          </div>
        </div>
        <div style={{ width: '100vw', height: '172px' }}></div>
      </>
    </>
  );
};

export default StoragePage;
