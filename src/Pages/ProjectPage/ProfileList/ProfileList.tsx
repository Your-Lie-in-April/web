import { useState } from 'react';
import styled from 'styled-components';
import MyProfile from './MyProfile';
import MemberProfile from './MemberProfile';
import LeaderProfile from './LeaderProfile';
import InvitationModal from '../Modal/InvitationModal';

const Box = styled.div`
  width: 286px;
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 36px;
  border-radius: 20px;
  background: #212121;
  justify-content: space-evenly;
  box-sizing: border-box;
`;

const MemberListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InviteBtn = styled.button`
  width: 52px;
  height: 22px;
  display: flex;
  padding: 5px 4px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  background: #633ae2;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CommonText = styled.div`
  color: #000000;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MemberList = styled.div`
  width: 100%;
  height: 412px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const ProfileList = () => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const toggleDeleteBtn = () => {
    setShowDeleteBtn((prev) => !prev);
  };

  const toggleInviteModal = () => {
    setShowInviteModal((prev) => !prev);
  };

  return (
    <Box>
      <MyProfile />
      <MemberListBox>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '174px',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <CommonText style={{ color: '#ffffff' }}>멤버</CommonText>
          <InviteBtn onClick={toggleInviteModal}>+초대하기</InviteBtn>{' '}
          {/* 초대하기 버튼 */}
        </div>
        <MemberList>
          <LeaderProfile toggleDeleteBtn={toggleDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
          <MemberProfile showDeleteBtn={showDeleteBtn} />
        </MemberList>
      </MemberListBox>
      {showInviteModal && (
        <InvitationModal onShowInviteModal={toggleInviteModal} />
      )}
    </Box>
  );
};

export default ProfileList;
