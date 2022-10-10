import { createSlice } from '@reduxjs/toolkit'

export const DeleteDialog = createSlice({
    name: "deleteDialog",
    initialState: {
        value: { isConfirm: false }
    },
    reducers: {
        deletedialogpopup: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { deletedialogpopup } = DeleteDialog.actions
export default DeleteDialog.reducer