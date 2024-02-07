import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//intialState
const initialState = {
  Blogs: null,
  status: null,
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
//create action and reducer
export const Blogs = createSlice({
  name: " BLOG",
  initialState,
  extraReducers: {
    [fetchBlogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBlogs.fulfilled]: (state, { payload }) => {
      state.Blogs = payload;
      state.status = "success";
    },
    [fetchBlogs.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});
export default Blogs.reducer;
