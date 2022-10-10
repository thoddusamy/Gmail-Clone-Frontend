import { createSlice } from '@reduxjs/toolkit'

export const inboxMailCount = createSlice({
    name: "inboxMailcount",
    initialState: {
        value: { count: 0 }
    },
    reducers: {
        inboxcount: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { inboxcount } = inboxMailCount.actions
export default inboxMailCount.reducer