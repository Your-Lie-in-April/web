import { ProjectEntity } from '@/types/projectType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    projectData: ProjectEntity | null;
}

const initialState: ProjectState = {
    projectData: null,
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProjectData: (state, action: PayloadAction<ProjectEntity | null>) => {
            state.projectData = action.payload;
        },
    },
});

export const { setProjectData } = projectSlice.actions;

export default projectSlice.reducer;
