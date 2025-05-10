import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Adjust the import path as necessary


const store = configureStore({
    reducer: {
        auth: authSlice,
        // Add your reducers here
    },
});

export default store;
