import { configureStore } from "@reduxjs/toolkit";
import postReducer from '../redux/post/postSlice'
import userReducer from '../redux/user/usersSlice'

export const store = configureStore({
    reducer: {
        post: postReducer,
        auth: userReducer,
    },
});