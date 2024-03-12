import styled from 'styled-components';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useState } from 'react';
import ChangeNickName from '../Modal/ChangeNickname';

const MyProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const MyProfileImg = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 40px;
  background: #aeaeae;
`;

const MyProfileNick = styled.div`
  display: flex;
  width: 168px;
  padding: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  border-radius: 10px;
  background: #633ae2;
  color: #ffffff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &: focus {
    border: none;
    outline: none;
  }
`;

const EditIcon = styled(BorderColorOutlinedIcon)`
  width: 22px;
  height: 22px;
  color: #b79fff;
`;

const MyEmailText = styled.div`
  color: #fff;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MyStatus = styled.div`
  width: 100%;
  height: 30px;
  padding: 7px 13px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #ffffff;
  box-sizing: border-box;

  color: #000000;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
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

const MyProfile = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const onSetIsEditModal = () => {
    setIsEditModal((prev) => !prev);
  };
  return (
    <>
      <MyProfileBox>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '22px',
          }}
        >
          <MyProfileImg />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <MyProfileNick>
              <div
                style={{
                  width: '144px',
                  height : "22px",
                  display : "flex",
                  gap : "8px",
                  alignItems :"center",
                  justifyContent : "flex-end"
                }}
              >
                <CommonText
                  style={{
                    width: '106px',
                    fontSize: '14px',
                    color: '#ffffff',
                  }}
                >
                  닉네임
                </CommonText>
                <EditButton onClick={onSetIsEditModal}>
                  <EditIcon />
                </EditButton>
              </div>
            </MyProfileNick>
            <MyEmailText>----------@gmail.com</MyEmailText>
          </div>
        </div>
        <MyStatus>현재상태메세지</MyStatus>
      </MyProfileBox>
      {isEditModal && <ChangeNickName onSetIsEditModal={onSetIsEditModal} />}
    </>
  );
};
export default MyProfile;
