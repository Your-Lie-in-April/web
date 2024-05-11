import styled from 'styled-components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreBtn from '../Buttons/MoreBtn';
import { useUserContext } from '#/Pages/MainPage/MainPage';

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

const EditMemberBtn = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &: focus {
        outline: none;
    }
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
const LeaderProfile = ({ toggleDeleteBtn }: { toggleDeleteBtn: React.MouseEventHandler<HTMLButtonElement> }) => {
    const { userData, setUserData } = useUserContext();
    return (
        <LeaderProfileBox>
            <LeaderProfileDiv>
                <LeaderImg>
                    <StyledImage src={userData?.profileImageUrl || defaultImg} alt="Profile Image" />
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
                        <CommonText>{userData?.nickname}(본인)</CommonText>
                        <CommonText
                            style={{
                                fontSize: '10px',
                                fontWeight: '400',
                            }}
                        >
                            {userData?.state}
                        </CommonText>
                    </div>
                    <MoreBtn />
                </div>
            </LeaderProfileDiv>
        </LeaderProfileBox>
    );
};

export default LeaderProfile;
