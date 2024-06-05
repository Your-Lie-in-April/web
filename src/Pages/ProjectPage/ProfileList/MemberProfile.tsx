import { MemberEntity } from '#/Types/membertype';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteMember from '../../Modal/DeleteMember';

const MemberProfileBox = styled.div`
  width: 100%;
  height: 52px;
  padding: 3px 4px;
  box-sizing: border-box;
  border-radius: 40px;
  background: #ffffff;
`;

const MemberProfileDiv = styled.div`
  width: 254px;
  display: flex;
  flex-direction: row;
  gap: 8px;

  position: relative;
`;

const MemberImg = styled.div<{ hasBorder: boolean }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d9d9d9;
  box-sizing: border-box;
  overflow: hidden;
  border: ${(props) => (props.hasBorder ? '2px solid #633ae2' : 'none')};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CommonText = styled.div`
  color: #000000;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const DeleteBtn = styled(RemoveCircleOutlineIcon)`
  width: 24px;
  height: 24px;
  color: #d9d9d9;
  align-self: center;

  position: absolute;
  right: 5px;

  &:hover {
    color: #eb5757;
    cursor: pointer;
  }
`;
const defaultImg = 'src/pics/default.png';
const MemberProfile = ({
  showDeleteBtn,
  member,
  isCurrentUser,
}: {
  showDeleteBtn: boolean;
  member: MemberEntity;
  isCurrentUser: boolean;
}) => {
  const [deleteMemModal, SetDeleteMemModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberEntity | null>(
    null
  );

  const onSetDeleteMemModal = () => {
    SetDeleteMemModal((prev) => !prev);
    setSelectedMember(member);
  };

  return (
    <>
      <MemberProfileBox>
        <MemberProfileDiv>
          <MemberImg hasBorder={isCurrentUser}>
            <StyledImage
              src={member?.profileImageUrl || defaultImg}
              alt='Profile Image'
            />
          </MemberImg>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              justifyContent: 'center',
            }}
          >
            <CommonText>{member?.nickname}</CommonText>
            <CommonText
              style={{
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              {member?.state}
            </CommonText>
          </div>
          <DeleteBtn
            style={{
              display: showDeleteBtn ? 'block' : 'none',
            }}
            onClick={onSetDeleteMemModal}
          />
        </MemberProfileDiv>
      </MemberProfileBox>
      {selectedMember && (
        <DeleteMember
          onSetDeleteMemModal={onSetDeleteMemModal}
          deleteMemModal={deleteMemModal}
          member={selectedMember}
        />
      )}
    </>
  );
};

export default MemberProfile;
