import { createSlice } from '@reduxjs/toolkit'

export const SpamDialog = createSlice({
    name: "spamDialog",
    initialState: {
        value: { isConfirm: false }
    },
    reducers: {
        spamdialogpopup: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { spamdialogpopup } = SpamDialog.actions
export default SpamDialog.reducer