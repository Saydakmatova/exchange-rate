import {createSlice} from "@reduxjs/toolkit";
import {fetchCurrencies} from "./ActionCreators";

const initialState ={
    currencies: [],
    currency: {},
    isLoading: false,
    error: '',
}

export const CurrenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchCurrencies.fulfilled.type]:(state = initialState, action) => {
            state.isLoading = false;
            state.error = "";
            state.currencies = action.payload;
            state.currency = action.payload.length === 0 ? {} : action.payload[0];
        },
        [fetchCurrencies.pending.type]: (state = initialState) => {
            state.isLoading = true;
            state.error = "";
        },
        [fetchCurrencies.rejected.type]: (state = initialState, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default CurrenciesSlice.reducer;
