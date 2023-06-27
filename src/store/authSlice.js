import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false, Name: "", Password: "", items: [], products: [], newItems: [] },
    reducers: {
        logIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        logInOut: (state, action) => {
            state.Name = action.payload?.userName
            state.Password = action.payload?.password
        },
        buyItems: (state, action) => {
            state.items.push(action.payload)
            state.products = action.payload?.products
        },
        deleteItems: (state, action) => {
            state.items = action.payload;
        },
    },

}

)
export const { logInOut, logIn, buyItems, deleteItems } = authSlice.actions


export default authSlice.reducer