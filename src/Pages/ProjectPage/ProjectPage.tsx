import Alarm from "./Alarm";
import ChangeNickName from "./Modal/ChangeNickname";
import ChangeStatus from "./Modal/ChangeStatus";
import DeleteMemeber from "./Modal/DeleteMember";
import DeleteProject from "./Modal/DeleteProject";
import MyPageModal from "./Modal/MyPageModal";
import ProfileList from "./ProjectList/ProfileList";
import EditMySchedule from "./Schedule/EditMySchedule";
import MemberSchedule from "./Schedule/MemberSchedule";
import MySchedule from "./Schedule/MySchedule";
import TeamSchedule from "./Schedule/TeamSchedule";

const ProjectPage = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <EditMySchedule />
      <br></br>
      <TeamSchedule />
      <br></br>
      <MySchedule />
      <br></br>
      <MemberSchedule />
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};
export default ProjectPage;
