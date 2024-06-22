import React, { FC } from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    margin: 0 auto;
`;

const PageIndicator = styled.div<{ active: boolean }>`
    width: ${({ active }) => (active ? '15px' : '10px')};
    height: ${({ active }) => (active ? '15px' : '10px')};
    margin: 0 5px;
    background-color: ${({ active }) => (active ? '#633ae2' : '#fbfbfb')};
    border-radius: 50%;
    cursor: pointer;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: ${({ disabled }) => (disabled ? '#D9D9D9' : '#633ae2')};
    }
`;

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages === 0) return null;

    const handlePrevious = () => {
        if (currentPage > 0) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };

    return (
        <PaginationContainer>
            <IconButton onClick={handlePrevious}>
                <ChevronLeftIcon style={{ fontSize: 30 }} />
            </IconButton>
            {Array.from({ length: totalPages }, (_, index) => (
                <PageIndicator key={index} active={index === currentPage} onClick={() => onPageChange(index)} />
            ))}
            <IconButton onClick={handleNext}>
                <ChevronRightIcon />
            </IconButton>
        </PaginationContainer>
    );
};

export default Pagination;
