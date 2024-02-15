type ScheduleItem = {
    startAt: string;
    endAt: string;
};

type DaySchedule = {
    dayOfWeek: string;
    schedule: ScheduleItem[];
};

type UserSchedule = {
    nickname: string;
    schedule: DaySchedule[];
};

export type ScheduleWeekResponse = UserSchedule;
