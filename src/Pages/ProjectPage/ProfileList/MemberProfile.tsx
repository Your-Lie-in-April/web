import styled from 'styled-components';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
`;

const MemberImg = styled.image`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d9d9d9;
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

  &:hover {
    color: #eb5757;
    cursor: pointer;
  }
`;

const MemberProfile = () => {
  return (
    <MemberProfileBox>
      <MemberProfileDiv>
        <MemberImg />
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
            <CommonText>닉네임(본인)</CommonText>
            <CommonText
              style={{
                fontSize: '10px',
                fontWeight: '400',
              }}
            >
              상태메세지
            </CommonText>
          </div>
          <DeleteBtn />
        </div>
      </MemberProfileDiv>
    </MemberProfileBox>
  );
};
export default MemberProfile;
