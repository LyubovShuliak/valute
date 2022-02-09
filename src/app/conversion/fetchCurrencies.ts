import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "e110c93729-ef8b5ec823-r6ydbj";
const BASE_URL = "https://api.fastforex.io";

type ConvertParams = {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
};

export interface RootObject {
  base: string;
  amount: number;
  result: { [code: string]: string } & { rate: number };
  ms: number;
}

export const convert = createAsyncThunk(
  "convert",
  async ({ fromCurrency, toCurrency, amount }: ConvertParams) => {
    const response = await fetch(
      `${BASE_URL}/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${API_KEY}`
    );
    return response.json();
  }
);

export const fetchCurrenciesByBase = createAsyncThunk(
  "convertByBase",
  async (base: string) => {
    const response = await fetch(
      `${BASE_URL}/fetch-all?from=${base}&api_key=${API_KEY}`
    );
    return response.json();
  }
);
export const fetchCurrencies = createAsyncThunk("currencies", async () => {
  const response: any = await fetch(
    `${BASE_URL}/currencies?api_key=${API_KEY}`
  );

  return response.json();
});
