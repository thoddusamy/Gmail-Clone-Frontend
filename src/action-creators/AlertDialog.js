import { createSlice } from '@reduxjs/toolkit'

export const AlertDialog = createSlice({
    name: "alertDialog",
    initialState: {
        value: { isOpen: false }
    },
    reducers: {
        alertdialogpopup: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { alertdialogpopup } = AlertDialog.actions
export default AlertDialog.reducer