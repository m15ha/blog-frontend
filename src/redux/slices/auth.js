import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async params => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.data = null;
        },
    },
    extraReducers: {
        // @ts-ignore
        [fetchAuth.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        // @ts-ignore
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        // @ts-ignore
        [fetchAuth.rejected]: state => {
            state.data = null;
            state.status = 'failed';
        },
        // @ts-ignore
        [fetchAuthMe.pending]: state => {
            state.data = null;
            state.status = 'loading';
        },
        // @ts-ignore
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        },
        // @ts-ignore
        [fetchAuthMe.rejected]: state => {
            state.data = null;
            state.status = 'failed';
        },
    },
});

export const selectIsAuth = state => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
