import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { userReducer } from './reducers/userReduser';
import { vacancyReducer } from './reducers/vacancyReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    user: userReducer,
    vacancy: vacancyReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
