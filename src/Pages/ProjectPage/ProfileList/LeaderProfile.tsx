import { MemberEntity } from '#/Types/membertype';
import styled from 'styled-components';
import MoreBtn from '../Buttons/MoreBtn';

const LeaderProfileBox = styled.div`
  width: 100%;
  height: 52px;
  padding: 3px 4px;
  box-sizing: border-box;
  border-radius: 40px;
  background: #ffffff;
`;

const LeaderProfileDiv = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const LeaderImg = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d9d9d9;
  border: 2px solid #633ae2;
  box-sizing: border-box;
  overflow: hidden;
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
const defaultImg = 'src/pics/default.png';

const LeaderProfile = ({
  toggleDeleteBtn,
  member,
  isCurrentUser,
}: {
  toggleDeleteBtn: () => void;
  member: MemberEntity;
  isCurrentUser: boolean;
}) => {
  return (
    <LeaderProfileBox>
      <LeaderProfileDiv>
        <LeaderImg>
          <StyledImage
            src={member?.profileImageUrl || defaultImg}
            alt='Profile Image'
          />
        </LeaderImg>
        <div
          style={{
            display: 'flex',
            flex: '1',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '7px',
              justifyContent: 'center',
            }}
          >
            <CommonText
               style={{
                maxWidth: '150px',
                fontSize: '14px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }}>
              {member?.nickname}
              {isCurrentUser ? '(본인)' : ''}
            </CommonText>
            <CommonText
              style={{
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              {member?.state}
            </CommonText>
          </div>
          <MoreBtn toggleDeleteBtn={toggleDeleteBtn} />
        </div>
      </LeaderProfileDiv>
    </LeaderProfileBox>
  );
};

export default LeaderProfile;
