import styled from 'styled-components';
import StorageProject from './StorageProject';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  column-gap: 25px;
  row-gap: 16px;
`;

const StorageProjectList = () => {
  return (
    <GridContainer>
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
      <StorageProject />
    </GridContainer>
  );
};
export default StorageProjectList;
