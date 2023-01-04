import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { userReducer } from './reducers/userReduser';

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
