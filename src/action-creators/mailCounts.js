import { createSlice } from '@reduxjs/toolkit'

export const mailCounts = createSlice({
    name: "mailCount",
    initialState: {
        value: { count: 0 }
    },
    reducers: {
        mailcount: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { mailcount } = mailCounts.actions
export default mailCounts.reducer