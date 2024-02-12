import styled from "styled-components";
import Pinned from "./components/Pinned";
import ProjectList from "./components/ProjectList";

const FlexProject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

function App() {
  return (
    <div>
      <FlexProject>
        <Pinned />
        <ProjectList />
      </FlexProject>
    </div>
  );
}

export default App;
