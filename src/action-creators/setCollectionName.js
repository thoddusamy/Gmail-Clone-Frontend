import { createSlice } from '@reduxjs/toolkit'

export const SetCollectionName = createSlice({
    name: "setCollectionname",
    initialState: {
        value: { collectionName: '' }
    },
    reducers: {
        setcollectionname: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setcollectionname } = SetCollectionName.actions
export default SetCollectionName.reducer