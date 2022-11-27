import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async params => {
        const { data } = await axios.post('/auth/login', params);
        return data;
    }
);

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [fetchUserData.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        // @ts-ignore
        [fetchUserData.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        // @ts-ignore
        [fetchUserData.rejected]: state => {
            state.data = null;
            state.status = 'failed';
        },
    },
});

export const authReducer = authSlice.reducer;
