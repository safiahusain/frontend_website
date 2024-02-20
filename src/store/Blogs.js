import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//intialState
const initialState = {
  Blogs: null,
  status: null,
  deliverReturns: null,
  securityPayments: null,
};
//fetch data from api
export const fetchBlogs = createAsyncThunk("BLOG/fetchBlogs", async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
});

export const GetDeliveryAndReturns = createAsyncThunk(
  "BLOG/GetDeliveryAndReturns",
  async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/delivery-and-returns`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.delivery_returns;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetSecurityAndPayments = createAsyncThunk(
  "BLOG/GetSecurityAndPayments",
  async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/security-and-payments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.security_payments;
    } catch (err) {
      console.log(err);
    }
  }
);
//create action and reducer
export const Blogs = createSlice({
  name: " BLOG",
  initialState,
  extraReducers: (builder) => {
    //Get MainPage Blogs/////////
    builder.addCase(fetchBlogs.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.Blogs = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.status = "failed";
    });

    //Get Deliver and Returns data/////////
    builder.addCase(GetDeliveryAndReturns.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(GetDeliveryAndReturns.fulfilled, (state, action) => {
      state.deliverReturns = action.payload;
      state.status = "success";
    });

    builder.addCase(GetDeliveryAndReturns.rejected, (state, action) => {
      state.status = "failed";
    });
    //Get Security and Payments /////////
    builder.addCase(GetSecurityAndPayments.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(GetSecurityAndPayments.fulfilled, (state, action) => {
      state.securityPayments = action.payload;
      state.status = "success";
    });

    builder.addCase(GetSecurityAndPayments.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});
export default Blogs.reducer;
