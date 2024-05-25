import styled, { createGlobalStyle } from 'styled-components';
import AfterLogin from '../Layouts/AfterLogin';
import StorageProjectList from './StorageProjectList';
import GraphicIcons from './Icon/GraphicIcons';
import { useEffect, useState } from 'react';
import { Http } from '#/constants/backendURL';
import { projectThumbnailList } from '#/mocks/mockData';
import { ProjectThumbnailResponse } from '#/Types/projecttype';

const GlobalStyle = createGlobalStyle`
body {
  width : 100%;
  min-width : 1366px;
  min-height : 1200px;
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

const SearchField = styled.input`
    width: 785px;
    height: 69px;
    border-radius: 40px;
    background: #ffffff;
    color: #a4a4a4;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    padding: 18px 28px;
    box-sizing: border-box;
    border: none;
    outline: none;
`;

const StoragePage = () => {
    const [storelist, setStoreList] = useState<ProjectThumbnailResponse[]>([]);
    useEffect(() => {
        const storeList = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await fetch(`${Http}/v1/projects/stored`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                        credentials: 'include',
                    },
                });
                if (!response.ok) throw new Error('뭔가 이상');
                const result = await response.json();
                setStoreList(result.data);
                console.log('보관함 결과:', result);
            } catch (error) {
                console.error('업데이트 실패:', error);
            }
        };
        storeList();
    }, [storelist]);

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
                            <SearchField placeholder="프로젝트 검색" />
                        </div>
                        <StorageProjectList projects={storelist} />
                    </div>
                </div>
                <div style={{ width: '100vw', height: '172px' }}></div>
            </>
        </>
    );
};

export default StoragePage;
