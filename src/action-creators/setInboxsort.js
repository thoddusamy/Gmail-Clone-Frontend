import { createSlice } from '@reduxjs/toolkit'

export const inboxSortValue = createSlice({
    name: "inboxSortvalue",
    initialState: {
        value: { numValue: -1 }
    },
    reducers: {
        inboxsortvalue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { inboxsortvalue } = inboxSortValue.actions
export default inboxSortValue.reducer