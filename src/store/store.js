import { configureStore } from "@reduxjs/toolkit";
import Blogs from "./Blogs";
import cart from "./Cart";
import Currencies from "./Currencies";
import compareProduct from "./compareProduct";
import websiteSetup from "./websiteSetup";
import wishlistData from "./wishlistData";

export default configureStore({
  reducer: {
    Currencies: Currencies,
    Blogs: Blogs,
    websiteSetup: websiteSetup,
    wishlistData: wishlistData,
    cart: cart,
    compareProducts: compareProduct,
  },
});
