import { ScheduleItem } from '#/types/schedule';

interface IsScheduledProps {
    schedule: ScheduleItem[];
    dayOfWeek: string;
    hour: number;
}

const daysOfWeek: { [key: string]: number } = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
};

// 스케줄이 있는지 확인 -> boolean 값으로 리턴
const isScheduled = ({
    schedule,
    dayOfWeek,
    hour,
}: IsScheduledProps): boolean => {
    // 하나라도 만족시 true 반환
    return schedule.some((item) => {
        // 각 스케줄 시작-끝 시간 객체 생성
        const itemStartAt = new Date(item.startAt);
        const itemEndAt = new Date(item.endAt);

        /* 현재 요일과 스케줄 항목 시작시간 일치 여부 &&
         스케줄 항목의 시작 시간이 주어진 시간보다 이전 &&
         종료 시간이 주어진 시간 이후인지 확인
        */
        return (
            daysOfWeek[dayOfWeek.toLowerCase()] === itemStartAt.getDay() &&
            itemStartAt.getHours() <= hour &&
            itemEndAt.getHours() > hour
        );
    });
};

export default isScheduled;
