import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//intialState
const initialState = {
  Currencies: [],
  status: null,
};
//fetch data from api
export const GetAllCurrencies = createAsyncThunk(
  "CURRENCIES/GetAllCurrencies",
  async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/get/currency/data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.currency;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
);
//create action and reducer
export const Currencies = createSlice({
  name: "CURRENCIES",
  initialState,
  extraReducers: {
    [GetAllCurrencies.pending]: (state, action) => {
      state.status = "loading";
    },
    [GetAllCurrencies.fulfilled]: (state, action) => {
      state.Currencies = action.payload;
      state.status = "success";
    },
    [GetAllCurrencies.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default Currencies.reducer;
