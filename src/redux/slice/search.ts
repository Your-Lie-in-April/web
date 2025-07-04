import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    keyword: string;
    searchData: any | null;
    page: number;
    totalPages: number;
    size: number;
    isStored: boolean;
    isSearching: boolean;
}

const initialState: SearchState = {
    keyword: '',
    searchData: null,
    page: 0,
    size: 6,
    totalPages: 0,
    isStored: false,
    isSearching: false,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setIsStored: (state, action: PayloadAction<boolean>) => {
            state.isStored = action.payload;
        },
        setIsSearching: (state, action: PayloadAction<boolean>) => {
            state.isSearching = action.payload;
        },
        setSearchData: (state, action: PayloadAction<any | null>) => {
            state.searchData = action.payload;
        },
    },
});

export const {
    setKeyword,
    setPage,
    setSize,
    setTotalPages,
    setIsStored,
    setIsSearching,
    setSearchData,
} = searchSlice.actions;

export default searchSlice.reducer;
