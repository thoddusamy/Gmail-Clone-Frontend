import { createSlice } from '@reduxjs/toolkit'

export const closeMailSendBox = createSlice({
    name: "closeSendBox",
    initialState: {
        value: { isClose: false }
    },
    reducers: {
        closemailsendbox: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { closemailsendbox } = closeMailSendBox.actions
export default closeMailSendBox.reducer