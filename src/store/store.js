import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import currenciesReducer from './reducers/CurrenciesSlice';

const rootReducer = combineReducers({
    currenciesReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};