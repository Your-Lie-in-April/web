import styled from 'styled-components';

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

const LeaderImg = styled.image`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d9d9d9;
  border: 2px solid #633ae2;
  box-sizing: border-box;
`;

const EditMemberBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &: focus {
    border: none;
    outline: none;
  }

  color: #633ae2;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
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

const LeaderProfile = ({
  toggleDeleteBtn,
}: {
  toggleDeleteBtn: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <LeaderProfileBox>
      <LeaderProfileDiv>
        <LeaderImg />
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
          <EditMemberBtn onClick={toggleDeleteBtn}>멤버수정</EditMemberBtn>
        </div>
      </LeaderProfileDiv>
    </LeaderProfileBox>
  );
};

export default LeaderProfile;
