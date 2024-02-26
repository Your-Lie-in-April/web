import styled from "styled-components";

const MemberProfileBox = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  padding: 3px 4px;
  gap: 12px;
  box-sizing: border-box;
  border-radius: 40px;
  background: #ffffff;
`;

const MemberImg = styled.image`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #d9d9d9;
  border: 1px solid #633ae2;
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

const LeaderProfile = () => {
  return (
    <div>
      <MemberProfileBox>
        <MemberImg />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: " 88px",
          }}
        >
          <div
            style={{
              width: "66px",
              display: "flex",
              flexDirection: "column",
              gap: " 5px",
              justifyContent: "center",
            }}
          >
            <CommonText>닉네임(본인)</CommonText>
            <CommonText
              style={{
                fontSize: "10px",
                fontWeight: "400",
              }}
            >
              상태메세지
            </CommonText>
          </div>
          <EditMemberBtn>멤버수정</EditMemberBtn>
        </div>
      </MemberProfileBox>
    </div>
  );
};
export default LeaderProfile;
