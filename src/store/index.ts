import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { userReducer } from './reducers/userReduser';

export const rootReducer = combineReducers({
    user: userReducer,
    todo: userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>;