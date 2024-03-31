import React, { useState } from 'react';
import styled from 'styled-components';

interface TimeSlotProps {
  id: number;
  onSelectFromHere: (id: number) => void;
  onSelectToHere: (id: number) => void;
  isSelected: boolean;
}

export const TimeSlotLeft: React.FC<TimeSlotProps> = ({
  id,
  onSelectFromHere,
  onSelectToHere,
  isSelected,
}) => {
  const handleMouseDown = () => {
    onSelectFromHere(id);
  };

  const handleMouseOver = () => {
    onSelectToHere(id);
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
      onMouseOver={handleMouseOver}
    ></div>
  );
};

export const TimeSlotRight: React.FC<TimeSlotProps> = ({
  id,
  onSelectFromHere,
  onSelectToHere,
  isSelected,
}) => {
  const handleMouseDown = () => {
    onSelectFromHere(id);
  };

  const handleMouseOver = () => {
    onSelectToHere(id);
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
      onMouseOver={handleMouseOver}
    ></div>
  );
};
