import React, { useState } from 'react';
import styled from 'styled-components';

interface TimeSlotProps {
    id: number;
    isSelected: boolean;
    onSelectSlot: (id: number) => void;
    onMouseEnter: () => void;
}

export const TimeSlotLeft: React.FC<TimeSlotProps> = ({
    id,
    isSelected,
    onSelectSlot,
    onMouseEnter,
}) => {
    const handleMouseDown = () => {
        onSelectSlot(id);
    };

    const handleMouseEnter = () => {
        onMouseEnter();
    };
    return (
        <div
            id={`Time${id}`}
            style={{
                verticalAlign: 'top',
                display: 'flex',
                flex: '1',
                width: '26.665px',
                height: '39.74px',
                borderRadius: '20px 0 0 20px',
                borderTop: '0.5px solid #a4a4a4',
                borderLeft: '0.5px solid #a4a4a4',
                borderBottom: '0.5px solid #a4a4a4',
                background: isSelected ? '#633AE2' : '#D9D9D9',
                boxSizing: 'border-box',
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        ></div>
    );
};

export const TimeSlotRight: React.FC<TimeSlotProps> = ({
    id,
    isSelected,
    onSelectSlot,
    onMouseEnter,
}) => {
    const handleMouseDown = () => {
        onSelectSlot(id);
    };

    const handleMouseEnter = () => {
        onMouseEnter();
    };
    return (
        <div
            id={`Time${id}`}
            style={{
                display: 'flex',
                width: '26.665px',
                height: '39.74px',
                borderRadius: '0 20px 20px 0',
                borderLeft: '0.5px dashed #a4a4a4',
                borderTop: '0.5px solid #a4a4a4',
                borderRight: '0.5px solid #a4a4a4',
                borderBottom: '0.5px solid #a4a4a4',
                background: isSelected ? '#633AE2' : '#D9D9D9',
                boxSizing: 'border-box',
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
        ></div>
    );
};
