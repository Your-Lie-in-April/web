import Alarm from "./Alarm";
import ChangeNickName from "./Modal/ChangeNickname";
import ChangeStatus from "./Modal/ChangeStatus";
import DeleteMemeber from "./Modal/DeleteMember";
import DeleteProject from "./Modal/DeleteProject";
import MyPageModal from "./Modal/MyPageModal";
import ProfileList from "./ProjectList/ProfileList";
import TimeTable from "./Schedule/EditMySchedule";

const ProjectPage = () => {
  return (
    <div>
      <ProfileList />
      <TimeTable />
    </div>
  );
};
export default ProjectPage;
