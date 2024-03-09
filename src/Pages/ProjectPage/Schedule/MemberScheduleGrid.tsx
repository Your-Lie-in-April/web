import styled from "styled-components";
import MemberSchedule from "./MemberSchedule";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(auto, auto);
  column-gap: 18px;
  row-gap: 20px;
`;

const MemberScheduleGrid = () => {
  return (
    <GridContainer>
      <MemberSchedule />
      <MemberSchedule />
      <MemberSchedule />
      <MemberSchedule />
      <MemberSchedule />
    </GridContainer>
  );
};
export default MemberScheduleGrid;
