import styled from "styled-components";
import Project from "./Project";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(auto, auto);
  column-gap: 25px;
  row-gap: 24px;
`;

const ProjectList = () => {
  return (
    <GridContainer>
      <Project />
      <Project />
      <Project />
      <Project />
      <Project />
    </GridContainer>
  );
};
export default ProjectList;
