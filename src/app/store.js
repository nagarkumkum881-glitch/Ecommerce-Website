// import { configureStore } from '@reduxjs/toolkit'
// import productReducer from "./ProductSlice";
// export const store = configureStore({
//   reducer: {
//     product:productReducer,
//   },
// })

import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});