// 1. Always import these two things
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'https://myinsta-ed083.containers.snapdeploy.app/api/post';
// 2. Initial state
const initialState = {
    post: [],
    postloading: false,
    posterror: false,
    postsuccess: false,
    postMessage: '',
};

// Function of addpost
export const addpost = createAsyncThunk('post/add', async(postData, thunkApi) => {
    try {
        // let userObj = thunkApi.getState().auth.user;
        // let token = userObj ? userObj.token : localStorage.getItem("token");
        let token = thunkApi.getState().auth.user.token;
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BASE_URL}/add-post/`, postData, config
            // headers: {
            //     Authorization: `Bearer ${token}`
            // }
        );
        console.log("Backend ka response:", response.data);

        return response.data.data || response.data;
    } catch (error) {
        let errorMessage = error.response && error.response.data && error.response.data.message;
        return thunkApi.rejectWithValue(errorMessage || "Post failed");
    }
});

// Function of getallpost
export const getallpost = createAsyncThunk('post/get', async(_, thunkApi) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-post`);
        return response.data;
    } catch (error) {
        let errorMsg = error.response && error.response.data && error.response.data.message;
        return thunkApi.rejectWithValue(errorMsg || "Post failed");
    }
});

const postSlice = createSlice({
    name: 'post', // ❌ Galti 3: name: [] array tha
    // ✅ Fix: name ek string hona chahiye
    initialState,
    reducers: {
        postReset: (state) => {
            state.postloading = false;
            state.posterror = false;
            state.postsuccess = false;
            state.postMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
        // ADD POST CASES
            .addCase(addpost.pending, (state) => {
                state.postloading = true;
                state.postsuccess = false; // ✅ Reset success on new request
                state.posterror = false;
            })
            .addCase(addpost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                state.postMessage = action.payload;
            })
            .addCase(addpost.fulfilled, (state, action) => {
                state.postloading = false;
                state.postsuccess = true;
                // ✅ Sirf tab push karo jab payload valid ho
                // Case 1: Agar backend se saari posts ki list (Array) aayi hai
                if (Array.isArray(action.payload)) {
                    state.post = action.payload.filter((p) => p && p._id);
                }
                // Case 2: Agar backend se sirf naya post (Object) aya hai
                else if (action.payload && action.payload._id) {
                    state.post.unshift(action.payload); // Naya post list mein sabse upar
                }
            })

        // GET ALL POST CASES
        .addCase(getallpost.pending, (state) => {
                state.postloading = true;
            })
            .addCase(getallpost.rejected, (state, action) => {
                state.postloading = false;
                state.posterror = true;
                state.postMessage = action.payload;
            })
            .addCase(getallpost.fulfilled, (state, action) => {
                state.postloading = false;
                // ✅ Array hai ya nahi check karo + khaali items hatao
                const arr = Array.isArray(action.payload) ? action.payload : [];
                state.post = arr.filter((p) => p && p._id);
            });
    }
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;