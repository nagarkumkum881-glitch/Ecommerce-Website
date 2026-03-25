// import { createSlice } from '@reduxjs/toolkit'


// const initialState={
//     ProductDataMap:{},
//     ids:{},
// };

// export const ProductSlice=createSlice({
//     name:"product",
//     initialState,
//     reducers: {
//         addProductDataById:(state,action)=>{
//             const productData=action.payload;
//             state.ProductDataMap[productData.id]=productData;
//         },
//     },
// });

// export const {addProductDataById}=ProductSlice.actions;
// export default ProductSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  productDataMap: {},
  homePageMap: {},
  productCategoryMap: {},
  wishlistData: {},
  cartData: {},
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductDataById: (state, action) => {
      const productDataArray = action.payload;
      for (let i = 0; i < productDataArray; i++) {
        const productData = productDataArray[i];
        state.productDataMap[productData.id] = productData;
      }
    },
    addProductArrayByPage: (state, action) => {
      const pageNumber = action.payload.pageNumber;
      const productArray = action.payload.productArray;
      state.homePageMap[pageNumber] = productArray;
    },
    addProductCategory: (state, action) => {
      const { category, products } = action.payload;
      state.productCategoryMap[category] = products;
    },
    addToWishlist: (state, action) => {
      const productData = action.payload;
      state.wishlistData[productData.id] = productData;
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      delete state.wishlistData[id];
    },
    addToCart: (state, action) => {
      const data = action.payload;
      const id = data?.id;
      const isProductInCart = state.cartData?.[id];

      if (isProductInCart) {
        state.cartData[id].qunatity += 1;
      } else {
        state.cartData[id] = { productData: data, qunatity: 1 };
      }
    },
    decreaseQuantityInCart: (state, action) => {
      const id = action.payload;
      const isProductInCart = state.cartData?.[id];
      if (isProductInCart) {
        if (isProductInCart.qunatity == 1) {
          delete state.cartData[id];
        } else {
          state.cartData[id].qunatity -= 1;
        }
      }
    },
    removeFormCart: (state, action) => {
      const id = action.payload;
      const isProductInCart = state.cartData?.[id];
      if (isProductInCart) {
        delete state.cartData[id];
      }
    },
  }
});

export const { addProductDataById, addProductArrayByPage, addProductCategory, addToWishlist, removeFromWishlist, 
  addToCart,
  decreaseQuantityInCart,
  removeFormCart, } = ProductSlice.actions;
export default ProductSlice.reducer;