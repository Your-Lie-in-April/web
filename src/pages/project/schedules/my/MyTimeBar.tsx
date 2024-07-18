import { ScheduleItem } from '@/types/scheduleType';
import React from 'react';

interface MyTimeBarProps {
    hours: number[];
    schedule: ScheduleItem[];
}

const MyTimeBar: React.FC<MyTimeBarProps> = ({ hours, schedule }) => {
    const totalWidth = hours.length * 40;

    const isScheduledTime = (hour: number, minute: number) => {
        return schedule.some((item) => {
            const itemStartTime = new Date(item.startTime);
            const itemEndTime = new Date(item.endTime);
            const itemTime = new Date(itemStartTime);
            itemTime.setHours(hour, minute, 0, 0);
            return itemStartTime <= itemTime && itemEndTime > itemTime;
        });
    };

    return (
        <div
            style={{
                width: `${totalWidth}px`,
                height: '29.804px',
                backgroundColor: 'transparent',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
            }}
        >
            {hours.map((hour) => {
                const isScheduledFirstHalf = isScheduledTime(hour, 0);
                const isScheduledSecondHalf = isScheduledTime(hour, 30);

                return (
                    <div
                        key={hour}
                        style={{
                            width: '40px',
                            height: '100%',
                            backgroundColor: '#D9D9D9',
                            position: 'relative',
                            borderRadius: '20px',
                            border: 'none',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: '0.5px',
                                height: '100%',
                                borderLeft: '1px dashed #a4a4a4',
                                transform: 'translateX(-50%)',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '0%',
                                width: '50%',
                                height: '100%',
                                backgroundColor: isScheduledFirstHalf ? '#633AE2' : 'transparent',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isScheduledFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderLeft: isScheduledFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderBottom: isScheduledFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderRight: 'none',
                                borderTopLeftRadius: '20px',
                                borderBottomLeftRadius: '20px',
                            }}
                        >
                            {isScheduledFirstHalf && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '100%',
                                        width: '0.5px',
                                        height: '100%',
                                        borderLeft: '1px dashed #ffffff',
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            )}
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: '50%',
                                height: '100%',
                                backgroundColor: isScheduledSecondHalf ? '#633AE2' : 'transparent',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isScheduledSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderRight: isScheduledSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderBottom: isScheduledSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderLeft: 'none',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        >
                            {isScheduledSecondHalf && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '0%',
                                        width: '0.5px',
                                        height: '100%',
                                        borderLeft: '1px dashed #ffffff',
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyTimeBar;
