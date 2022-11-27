import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        posts: postsReducer,
        auth: authReducer,
    },
    // Add the generated middleware to the store
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware().concat(api.middleware),
});

export default store;
