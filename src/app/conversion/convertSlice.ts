import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  fetchCurrenciesByBase,
  convert,
  fetchCurrencies,
} from "./fetchCurrencies";

interface Conversion {
  value: any;
  currencies: { currencies: string[][]; isLoading: boolean };
  conversionByBase: { conversion: string[][]; isLoading: boolean };
}

const initialState: Conversion = {
  value: {},
  currencies: { currencies: [], isLoading: false },
  conversionByBase: { conversion: [], isLoading: false },
};

const convertSlice = createSlice({
  name: "convert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrenciesByBase.pending, (state) => {
      state.conversionByBase.isLoading = true;
    });

    builder.addCase(fetchCurrenciesByBase.fulfilled, (state, action) => {
      state.conversionByBase.conversion = Object.entries(
        action.payload.results
      );
      state.conversionByBase.isLoading = false;
    });

    builder.addCase(fetchCurrencies.pending, (state) => {
      state.currencies.isLoading = true;
    });

    builder.addCase(fetchCurrencies.fulfilled, (state, action) => {
      state.currencies.currencies = Object.entries(action.payload.currencies);

      state.currencies.isLoading = false;
    });

    builder.addCase(convert.fulfilled, (state, action) => {
      state.value = action.payload.result;
    });
  },
});

export const currencies = (state: RootState) =>
  state.convert.currencies.currencies;

export const currencyCourse = (state: RootState) =>
  state.convert.conversionByBase.conversion;

export const conversationResult = (state: RootState) => state.convert.value;

export const isLoadingConversion = (state: RootState) =>
  state.convert.conversionByBase.isLoading;

export const {} = convertSlice.actions;

export const convertReducer = convertSlice.reducer;
