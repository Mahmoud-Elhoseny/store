import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch('https://ecommerce-data-i0oz.onrender.com/products')
        const data = await res.json()

        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
}
)
export const getProduct = createAsyncThunk("products/getProduct", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch(`https://ecommerce-data-i0oz.onrender.com/products/${id}`)
        const data = await res.json()
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
}
)
export const insertProduct = createAsyncThunk("products/insertProduct", async (productData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await fetch("https://ecommerce-data-i0oz.onrender.com/products", {
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'content-type': 'application/json; charset=utf-8',
            }
        }
        )
        const data = await res.json(productData)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
}
)

const productSlice = createSlice({
    name: 'product',
    initialState: { product: null, isLoading: false, error: null, },
    reducers: {},
    extraReducers: (builder) => {
        // fetch product
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
            state.error = null
        })

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.product = action.payload
        })

        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload

        })

        // get product details

        builder.addCase(getProduct.pending, (state) => {
            state.error = null
            state.isLoading = true

        })

        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload
            state.isLoading = false

        })

        builder.addCase(getProduct.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })

        // insert product
        builder.addCase(insertProduct.pending, (state) => {
            state.error = null
        })

        builder.addCase(insertProduct.fulfilled, (state, action) => {
            state.product?.push(action.payload)
        })

        builder.addCase(insertProduct.rejected, (state, action) => {
            state.error = action.payload

        })






    }
})
export default productSlice.reducer