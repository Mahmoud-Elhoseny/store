import { configureStore } from "@reduxjs/toolkit";
import product from './productSlice'
import auth from './authSlice'

export default configureStore({
    reducer: {
        product,
        auth
    }
})
