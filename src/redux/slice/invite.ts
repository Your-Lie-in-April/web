import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    invitationLink: string;
}

const initialState: ProjectState = {
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
