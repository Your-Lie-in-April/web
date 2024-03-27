import styled, { createGlobalStyle } from 'styled-components';
import AfterLogin from '../Layouts/AfterLogin';
import ArrowIcon from './Icon/ArrowIcon';
import StorageProjectList from './StorageProjectList';
import SummertimeSadnessIcon from './Icon/Summertime_sadness ';
import LightningIcon from './Icon/LightningIcon';
import SpringIcon from './Icon/SpringIcon';
import GraphicIcons from './Icon/GraphicIcons';

const GlobalStyle = createGlobalStyle`
  body {
    min-height : 1573px;
    margin: 0;
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
  z-index: 0;
`;

const StoragePage = () => {
  return (
    <>
      <GlobalStyle />
      <GraphicIcons />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '130px',
          width: '100vw',
          margin: '0 auto',
        }}
      >
        <AfterLogin />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '49px',
            alignItems: 'center',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
          >
            <Title>프로젝트 보관함</Title>
            <SearchField placeholder="프로젝트 검색" />
          </div>
          <StorageProjectList />
        </div>
      </div>
      <div style={{ width: '100vw', height: '172px' }}></div>
    </>
  );
};
export default StoragePage;
