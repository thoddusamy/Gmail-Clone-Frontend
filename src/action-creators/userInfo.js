import { createSlice } from '@reduxjs/toolkit'

export const UserInfo = createSlice({
    name: "userInfo",
    initialState: {
        value: { name: '', email: '', img: '' }
    },
    reducers: {
        userinfo: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { userinfo } = UserInfo.actions
export default UserInfo.reducer