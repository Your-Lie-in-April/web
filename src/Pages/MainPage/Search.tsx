import { FC } from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
    width: 785px;
    height: 70px;
    left: 650px;
    top: 470px;
    background: #ffffff;
    border-radius: 40px;
    align-items: center;
    display: flex;
    position: absolute;
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
const Search: FC = () => {
    return (
        <SearchDiv>
            <SearchInput type="text" placeholder="프로젝트 검색"></SearchInput>
        </SearchDiv>
    );
};

export default Search;
