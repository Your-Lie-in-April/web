import { FC } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const BeforeLoginDiv = styled.div`
  width: 100vw;
  height: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  z-index: 1;

  color: #000000;
  font-style: normal;
`;

const Logo = styled.div`
  position: relative;
  bottom: 14px;
  justify-content: center;
  align-item: center;

  white-space: nowrap;

  font-weight: 700;
  font-size: 32px;
`;

const  LogInDiv = styled.div`
  position: relative;
  bottom: 21px;
  justify-content: flex-end;
  flex-basis: 20%;
  white-space: nowrap;
`;

const LogInBtn = styled.button`
 box-sizing: border-box;

  font-weight: 500;
  font-size: 22px;

  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }
`;



const BeforeLogin: FC = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <BeforeLoginDiv>
            <Logo onClick={() => navigate('/')}>TIME PIECE</Logo>
            <div style={{ marginLeft: '493.17px' }}>
                <LogIn onClick={handleLoginClick}>Log in</LogIn>
            </div>
        </BeforeLoginDiv>
    );
  return (
    <BeforeLoginDiv>
      <div style={{ justifyContent: 'flex-start', flexBasis: '20%' }} />
      <Logo>TIME PIECE</Logo>
      <LogInDiv><LogInBtn>Log in</LogInBtn></LogInDiv>
     
    </BeforeLoginDiv>
  );
};
export default BeforeLogin;
