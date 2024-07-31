import { useSearch } from '@hooks/context/searchContext';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
    width: 785px;
    height: 70px;
    background: #ffffff;
    border-radius: 40px;
    align-items: center;
    display: flex;
    padding: 18px 28px;
    box-sizing: border-box;
`;

const SearchInput = styled.input`
    font-weight: 800;
    font-size: 28px;
    color: #000000;
    font-family: 'Pretendard';
    border: none;
    outline: none;
    background: transparent;
    opacity: 0.9;
    width: 100%;
`;

const Search: FC = () => {
    const { setKeyword, setCurrentPage } = useSearch();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(searchTerm);
            setCurrentPage(0);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, setKeyword, setCurrentPage]);

    return (
        <SearchDiv>
            <SearchInput
                type='text'
                placeholder='프로젝트 검색'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </SearchDiv>
    );
};

export default Search;
