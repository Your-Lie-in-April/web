import React, { FC } from 'react';
import styled from 'styled-components';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PageIndicator = styled.span`
    margin: 0 10px;
    color: #633ae2;
    font-weight: bold;
`;

const PageButton = styled.button<{ disabled: boolean }>`
    background-color: #633ae2;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
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
            <PageButton onClick={handlePrevious} disabled={currentPage === 0}>
                {'<'}
            </PageButton>
            <PageIndicator>
                {currentPage + 1} / {totalPages}
            </PageIndicator>
            <PageButton onClick={handleNext} disabled={currentPage === totalPages - 1}>
                {'>'}
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;
