import { ScheduleItem } from '@/types/scheduleType';
import React from 'react';

interface PinnedTimeBarProps {
    hours: number[];
    schedule: ScheduleItem[];
    memberCount: number;
}

const PinnedTimeBar: React.FC<PinnedTimeBarProps> = ({ hours, schedule, memberCount }) => {
    const totalWidth = hours.length * 40;

    const getColor = (count: number) => {
        const baseColor = '#633AE2';
        const opacity = count / memberCount;
        return `${baseColor}${Math.round(opacity * 255)
            .toString(16)
            .padStart(2, '0')}`;
    };

    const getMemberCountAtTime = (hour: number, minute: number) => {
        return schedule.filter((item) => {
            const itemStartTime = new Date(item.startTime);
            const itemEndTime = new Date(item.endTime);

            // 자정시간 24로 간주
            if (itemEndTime.getHours() === 0 && itemEndTime.getMinutes() === 0) {
                itemEndTime.setHours(24, 0, 0, 0);
            }

            const itemTime = new Date(itemStartTime);
            itemTime.setHours(hour, minute, 0, 0);
            return itemStartTime <= itemTime && itemEndTime > itemTime;
        }).length;
    };

    const isFullMemberTime = (hour: number, minute: number) => {
        return getMemberCountAtTime(hour, minute) === memberCount;
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
                const isColoredFirstHalf = getMemberCountAtTime(hour, 0) > 0;
                const isColoredSecondHalf = getMemberCountAtTime(hour, 30) > 0;
                const isFullMemberFirstHalf = isFullMemberTime(hour, 0);
                const isFullMemberSecondHalf = isFullMemberTime(hour, 30);

                return (
                    <div
                        key={hour}
                        style={{
                            width: '40px',
                            height: '100%',
                            backgroundColor: 'transparent',
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '0%',
                                width: '50%',
                                height: '100%',
                                backgroundColor: isColoredFirstHalf
                                    ? getColor(getMemberCountAtTime(hour, 0))
                                    : '#D9D9D9',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isFullMemberFirstHalf ? '1px solid #000000' : 'none',
                                borderLeft: isFullMemberFirstHalf ? '1px solid #000000' : 'none',
                                borderBottom: isFullMemberFirstHalf ? '1px solid #000000' : 'none',
                                borderRight: 'none',
                                borderTopLeftRadius: '20px',
                                borderBottomLeftRadius: '20px',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '100%',
                                    width: '0.5px',
                                    height: '100%',
                                    borderLeft: isColoredFirstHalf
                                        ? '1px dashed #ffffff'
                                        : '1px dashed #a4a4a4',
                                    transform: 'translateX(-50%)',
                                }}
                            />
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '50%',
                                width: '50%',
                                height: '100%',
                                backgroundColor: isColoredSecondHalf
                                    ? getColor(getMemberCountAtTime(hour, 30))
                                    : '#D9D9D9',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isFullMemberSecondHalf ? '1px solid #000000' : 'none',
                                borderRight: isFullMemberSecondHalf ? '1px solid #000000' : 'none',
                                borderBottom: isFullMemberSecondHalf ? '1px solid #000000' : 'none',
                                borderLeft: 'none',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '0%',
                                    width: '0.5px',
                                    height: '100%',
                                    borderLeft: isColoredSecondHalf
                                        ? '1px dashed #ffffff'
                                        : '1px dashed #a4a4a4',
                                    transform: 'translateX(-50%)',
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PinnedTimeBar;
