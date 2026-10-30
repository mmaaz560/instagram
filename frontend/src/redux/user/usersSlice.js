import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios' // <-- Ye add kiya

const BASE_URL = 'https://myinsta-ed083.containers.snapdeploy.app/api/user';
let checkuser = JSON.parse(localStorage.getItem('user'))
const initialState = {
    userloding: false,
    usersuccess: false,
    usererror: false,
    usermessage: '',
    user: checkuser ? checkuser : null
}

// Yahan registerUser (capital U) kar diya hai
export const registerUser = createAsyncThunk('register-user', async(user, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}/register-user`, user)
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error)
            // YAHAN FIX HAI: Backend ke response se sirf message nikaal rahe hain
        let errorMessage = "Registration failed";

        if (error.response && error.response.data) {
            // Agar backend ne { message: "..." } bheja hai
            if (typeof error.response.data === 'object' && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            // Agar backend ne direct string bheji hai
            else if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        return thunkAPI.rejectWithValue(errorMessage)

    }
})


export const verifyOTP = createAsyncThunk('verify-otp', async(otpData, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}/verify-otp`, otpData)
        return response.data
    } catch (error) {
        console.log(error)
            // YAHAN FIX HAI: Backend ke response se sirf message nikaal rahe hain
        let errorMessage = "verification failed";

        if (error.response && error.response.data) {
            // Agar backend ne { message: "..." } bheja hai
            if (typeof error.response.data === 'object' && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            // Agar backend ne direct string bheji hai
            else if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            }
        } else if (error.message) {
            errorMessage = error.message;
        }
        return thunkAPI.rejectWithValue(errorMessage)

    }
})

const usersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userReset: (state) => {
            state.userloding = false;
            state.usererror = false;
            state.usersuccess = false;
            state.usermessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userloding = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.userloding = false
                state.usererror = true
                state.usermessage = action.payload
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userloding = false
                state.usersuccess = true
                state.user = action.payload
            })
            .addCase(verifyOTP.pending, (state) => {
                state.userloding = true
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.userloding = false
                state.usererror = true
                state.usermessage = action.payload
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.userloding = false
                state.usersuccess = true
                state.user = action.payload
            })
    }
});

export const { userReset } = usersSlice.actions
export default usersSlice.reducer