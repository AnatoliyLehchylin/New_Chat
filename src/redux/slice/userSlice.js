import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    id: "",
    name: "",
    role: "",
    photoFileUser: null,
    photoFileUserPost: null,
    created: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.id = action.payload._id;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.photoFileUser = action.payload.photoFileUser;
            state.photoFileUserPost = action.payload.photoFileUserPost;
            state.created = action.payload.created_at;
        },
        reset: () => initialState,
    }
});

export const {
    reset,
    addUser
} = userSlice.actions;

export default userSlice.reducer;
