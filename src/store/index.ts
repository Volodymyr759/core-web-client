import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReduser';

export const rootReducer = combineReducers({
    user: userReducer,
    todo: userReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
