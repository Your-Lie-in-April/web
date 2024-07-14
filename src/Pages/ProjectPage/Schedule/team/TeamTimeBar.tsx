import { ScheduleItem } from '#/types/scheduleType';
import React from 'react';

interface TeamTimeBarProps {
    hours: number[];
    schedule: ScheduleItem[];
    memberCount: number;
}

const TeamTimeBar: React.FC<TeamTimeBarProps> = ({ hours, schedule, memberCount }) => {
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
                                backgroundColor: isColoredFirstHalf
                                    ? getColor(getMemberCountAtTime(hour, 0))
                                    : 'transparent',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isFullMemberFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderLeft: isFullMemberFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderBottom: isFullMemberFirstHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderRight: 'none',
                                borderTopLeftRadius: '20px',
                                borderBottomLeftRadius: '20px',
                            }}
                        >
                            {isColoredFirstHalf && (
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
                                backgroundColor: isColoredSecondHalf
                                    ? getColor(getMemberCountAtTime(hour, 30))
                                    : 'transparent',
                                boxSizing: 'border-box',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTop: isFullMemberSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderRight: isFullMemberSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderBottom: isFullMemberSecondHalf
                                    ? '1px solid #000000'
                                    : '1px solid #7d7d7d',
                                borderLeft: 'none',
                                borderTopRightRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        >
                            {isColoredSecondHalf && (
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

export default TeamTimeBar;
