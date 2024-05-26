import { FC, useState } from 'react';
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
const Search: FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(searchTerm);
        }
    };

    return (
        <SearchDiv>
            <SearchInput
                type="text"
                placeholder="프로젝트 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </SearchDiv>
    );
};
export default Search;
