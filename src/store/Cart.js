import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import auth from "../../utils/auth";
//constant
const CART = "CART";
//intialState
const initialState = {
  cart: null,
  status: null,
};
//fetch data from api
export const fetchCart = createAsyncThunk("CART/fetchCart", async () => {
  if (auth()) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/cart?token=${
        auth().access_token
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  }
  return false;
});

export const postCart = createAsyncThunk("CART/postCart", async (holddata) => {
  if (auth()) {
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}api/add/cart`, holddata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${auth().access_token}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success(res?.data?.message);
            localStorage.removeItem("data-hold");
          }
          return {
            data: res.data,
            message: "success",
          };
        })
        .catch((err) => {
          console.log(err, "cart error");
        });
    } catch (error) {
      console.log("Error:", error);
    }
  }
  return false;
});
//create action and reducer
export const cart = createSlice({
  name: CART,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
    });

    builder.addCase(postCart.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(postCart.fulfilled, (state, action) => {
      state.status = "success";
    });

    builder.addCase(postCart.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
export default cart.reducer;
