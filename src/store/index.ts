import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { candidateReducer } from './reducers/candidateReducer';
import { countryReducer } from './reducers/countryReducer';
import { employeeReducer } from './reducers/employeeReducer';
import { favoriteVacancyReducer } from './reducers/favoriteVacancyReducer';
import { officeReducer } from './reducers/officeReducer';
import { serviceReducer } from './reducers/serviceReducer';
import { userReducer } from './reducers/userReduser';
import { vacancyReducer } from './reducers/vacancyReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    candidate: candidateReducer,
    country: countryReducer,
    employee: employeeReducer,
    favoriteVacancy: favoriteVacancyReducer,
    office: officeReducer,
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
