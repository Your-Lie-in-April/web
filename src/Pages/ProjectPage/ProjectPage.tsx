import Alarm from "./Alarm";
import ChangeNickName from "./Modal/ChangeNickname";
import ChangeStatus from "./Modal/ChangeStatus";
import DeleteMemeber from "./Modal/DeleteMember";
import DeleteProject from "./Modal/DeleteProject";
import MyPageModal from "./Modal/MyPageModal";

const ProjectPage = () => {
  return (
    <div>
      <ChangeNickName />
      <ChangeStatus />
      <DeleteMemeber />
      <DeleteProject />
      <MyPageModal />
      <Alarm />
    </div>
  );
};
export default ProjectPage;
