import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user: User | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    loading: true
}

export const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        userExist: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },

        userNotExist: (state) => {
            state.user = null;
            state.loading = false;
        }
    }
});

export const { userExist, userNotExist } = userReducer.actions;