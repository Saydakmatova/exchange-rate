import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {CURRENCY_API_URL} from "../../utils/settings";
import {getPrevUrlFromResponse, responseToSchema} from "../../utils/convertor";

const getCurrencies = async (url, arr = []) => {
  const response = await axios.get(url);
  arr.push(responseToSchema(response));
  if (arr.length < 10) {
    arr = await getCurrencies(getPrevUrlFromResponse(response), arr);
  }
  return arr;
};

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await getCurrencies(CURRENCY_API_URL);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
)
