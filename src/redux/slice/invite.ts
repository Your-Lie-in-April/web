import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface inviteState {
    invitationLink: string;
}

const initialState: inviteState = {
    invitationLink: '',
};

export const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setInvitationLink: (state, action: PayloadAction<string>) => {
            state.invitationLink = action.payload;
        },
    },
});

export const { setInvitationLink } = inviteSlice.actions;

export default inviteSlice.reducer;
