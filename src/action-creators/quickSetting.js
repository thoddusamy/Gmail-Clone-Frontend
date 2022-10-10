import { createSlice } from '@reduxjs/toolkit'

export const quickSetting = createSlice({
    name: "quickSettings",
    initialState: {
        value: { value: false }
    },
    reducers: {
        quicksetting: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { quicksetting } = quickSetting.actions
export default quickSetting.reducer