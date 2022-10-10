import { createSlice } from '@reduxjs/toolkit'

export const LoadingText = createSlice({
    name: "loadingText",
    initialState: {
        value: { isLoading: false }
    },
    reducers: {
        loadingtext: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { loadingtext } = LoadingText.actions
export default LoadingText.reducer