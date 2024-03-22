import { configureStore } from '@reduxjs/toolkit'
import {requestReducer} from 'entities/Request';
import {userReducer} from 'entities/User'

export const store = configureStore({
    reducer: {
        request: requestReducer,
        user: userReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch