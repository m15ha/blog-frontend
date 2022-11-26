import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';

const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        posts: postsReducer,
    },
    // Add the generated middleware to the store
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(api.middleware),
});

export default store;
