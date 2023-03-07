import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { countryReducer } from './reducers/countryReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { serviceReducer } from './reducers/serviceReducer';
import { userReducer } from './reducers/userReduser';
import { vacancyReducer } from './reducers/vacancyReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    country: countryReducer,
    employee: employeeReducer,
    service: serviceReducer,
    user: userReducer,
    vacancy: vacancyReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
