import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../slice/userSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice
    }
});

export default store;