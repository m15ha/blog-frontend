import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // @ts-ignore
        [fetchPosts.pending]: state => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        // @ts-ignore
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        // @ts-ignore
        [fetchPosts.rejected]: state => {
            state.posts.items = [];
            state.posts.status = 'failed';
        },
        // @ts-ignore
        [fetchTags.pending]: state => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        // @ts-ignore
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        // @ts-ignore
        [fetchTags.rejected]: state => {
            state.tags.items = [];
            state.tags.status = 'failed';
        },
    },
});

export const postsReducer = postsSlice.reducer;
