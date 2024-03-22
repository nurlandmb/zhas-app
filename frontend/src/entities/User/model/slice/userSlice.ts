import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {UserSchema} from '../types.ts';


// Define the initial state using that type
const initialState: UserSchema = {
    phone: "",
    type: "",
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserIsloading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        }
    }
})

export const {
    setUserIsloading,
    setType,
    setPhone
} = userSlice.actions


export default userSlice.reducer