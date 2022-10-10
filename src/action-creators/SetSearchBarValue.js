import { createSlice } from '@reduxjs/toolkit'

export const SetSearchBarValue = createSlice({
    name: "setSearchBarvalue",
    initialState: {
        value: { inputValue: '' }
    },
    reducers: {
        inputvalue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { inputvalue } = SetSearchBarValue.actions
export default SetSearchBarValue.reducer