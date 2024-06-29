import { Http } from '#/constants/backendURL';
import { DateContext } from '#/hooks/context/dateContext';
import { useUserContext } from '#/Pages/MainPage/MainPage';
import { ScheduleWeekResponse } from '#/Types/scheduletype';
import dayjs from 'dayjs';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditMySchedule from './edit/EditMySchedule';
import MyTime from './MyTime';

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

interface MyScheduleProps {
    isEditModal: boolean;
    setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MySchedule: React.FC<MyScheduleProps> = ({
    isEditModal,
    setIsEditModal,
}) => {
    const onSetIsEditModal = () => {
        setIsEditModal((prevState) => !prevState);
    };

    // 유저데이터가져옴
    const { userData } = useUserContext();
    const memberId = userData?.memberId;

    // 프로젝트 ID 가져옴
    const { projectId } = useParams();

    // 달력 선택 날짜 가져옴
    const date = useContext(DateContext);
    const condition = dayjs(date?.selectedDate).format('YYYY-MM-DD') ?? '';

    const [scheduleData, setSchdeuleData] =
        useState<ScheduleWeekResponse | null>(null);
    // 스케줄 데이터 가져옴
    const fetchSchedule = useCallback(async () => {
        const accessToken = localStorage.getItem('access_token');
        const memberId = localStorage.getItem('member_id');
        try {
            const response = await fetch(
                `${Http}/v1/projects/${projectId}/members/${memberId}/schedules?condition=${condition}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: '*/*',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            setSchdeuleData(data.data);
        } catch (error) {
            console.error(error);
        }
    }, [projectId, memberId, condition]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);


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
                    <div
                        style={{ justifyContent: 'flex-end', flexBasis: '1%' }}
                    />
                </div>
                <MyTime scheduleData={scheduleData} />
            </Box>

            <EditMySchedule
                onSetIsEditModal={onSetIsEditModal}
                scheduleData={scheduleData}
                isEditModal={isEditModal}
                fetchSchedule={fetchSchedule}
            />
        </>
    );
};

export default MySchedule;
