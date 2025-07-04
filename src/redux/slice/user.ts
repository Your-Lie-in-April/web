import { MemberEntity } from '@/types/memberType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userData: MemberEntity | null;
    isLoading: boolean;
}

const initialState: UserState = {
    userData: null,
    isLoading: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<MemberEntity | null>) => {
            state.userData = action.payload;
        },
        setIsLoadingUserData: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUserData, setIsLoadingUserData } = userSlice.actions;

export default userSlice.reducer;
