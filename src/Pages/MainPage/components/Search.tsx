import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
    width: 785px;
    height: 70px;

    background: #ffffff;
    border-radius: 40px;
    align-items: center;
    display: flex;
`;
const SearchInput = styled.input`
    margin-left: 28px;
    font-weight: 800;
    font-size: 28px;
    color: #a4a4a4;
    font-family: 'Pretendard';
    border: none;
    outline: none;
    background: transparent;
    opacity: 0.9;
`;

interface SearchProps {
    onSearch: (query: string) => void;
    debounceDelay?: number;
}

const Search: FC<SearchProps> = ({ onSearch, debounceDelay = 300 }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, debounceDelay);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm, onSearch, debounceDelay]);

    return (
        <SearchDiv>
            <SearchInput
                type="text"
                placeholder="프로젝트 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </SearchDiv>
    );
};
export default Search;
