import React from "react";
import { useState,useEffect } from "react";
import { addProductCategory } from "../app/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
const UseProductCategory=(category)=>{
    const productCategoryMap =useSelector((state) => state.product.productCategoryMap);
 // console.log(productCategoryMap);
  const dispatch=useDispatch();
  const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function getData() {
        try {
          console.log("Api called",category);
          
          let apiData = await fetch(
            `https://dummyjson.com/products/category/${category}`,
          );
          let jsonData = await apiData.json();
          setProductData(jsonData.products);
          dispatch(addProductCategory({
      category: category,
      products: jsonData.products
    }));
          //console.log(jsonData);
          
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    
      useEffect(() => {
    
        const cacheData=productCategoryMap[category];
        if(cacheData){
          // console.log("cache");
          setLoading(false);
          setProductData(cacheData);
    
        }else{
          // console.log("api caled");
          getData();
        }
        
      }, []);
    
    return { loading, productData };
}
export default UseProductCategory;
