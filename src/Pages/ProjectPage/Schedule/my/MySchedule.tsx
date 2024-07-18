import useScheduleMemberQuery from '@hooks/apis/queries/schedule/useScheduleMemberQuery';
import { DateContext } from '@hooks/context/dateContext';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditMySchedule from './edit/EditMySchedule';
import MyTime from './MyTime';

interface MyScheduleProps {
    isEditModal: boolean;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MySchedule: React.FC<MyScheduleProps> = ({ isEditModal, setIsEditModal }) => {
    const onSetIsEditModal = () => {
        setIsEditModal((prevState) => !prevState);
    };

    const memberId = Number(localStorage.getItem('member_id'));
    const { projectId } = useParams();

    const date = useContext(DateContext);
    const condition = dayjs(date?.selectedDate).format('YYYY-MM-DD') ?? '';

    const { data: scheduleData } = useScheduleMemberQuery(Number(projectId), memberId, condition);

    return (
        <>
            <Box>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <div
                        style={{
                            justifyContent: 'flex-start',
                            flexBasis: '10%',
                        }}
                    />
                    <Title>나의 시간표</Title>
                    <EditBtn onClick={onSetIsEditModal}>수정하기</EditBtn>
                    <div style={{ justifyContent: 'flex-end', flexBasis: '1%' }} />
                </div>
                <MyTime scheduleData={scheduleData ?? null} />
            </Box>
            <EditMySchedule
                onSetIsEditModal={onSetIsEditModal}
                scheduleData={scheduleData ?? null}
                isEditModal={isEditModal}
            />
        </>
    );
};
export default MySchedule;

const Box = styled.div`
    width: 661px;
    height: 294px;
    border-radius: 20px;
    border: 1px solid #000000;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 5px 5px 8px 3px;
    justify-content: space-between;
`;

const CommonText = styled.div`
    color: #000000;
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const Title = styled(CommonText)`
    width: 430px;
    height: 20px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;

    flex-basis: 80%;
`;

const EditBtn = styled.button`
    width: 51px;
    padding: 4px 8px;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;
    border-radius: 15px;
    background: #633ae2;

    color: #ffffff;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;

    &:focus {
        outline: none;
    }
`;
