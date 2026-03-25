import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../Store/ThemeProvider";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import ProductCard from "../Components/ProductCard";
import UseProductCategory from "../Hooks/UseProductCategory";
// import { addProductCategory } from "../app/ProductSlice";
// import { useDispatch, useSelector } from "react-redux";
const ProductCategory = () => {
  // const productCategoryMap =useSelector((state) => state.product.productCategoryMap);
  // console.log(productCategoryMap);
  // const dispatch=useDispatch();
  
  const { theme } = useContext(ThemeContext);
  // const [productData, setProductData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { url: category } = useParams(); // used alias (for a diffrent name of Url as category )
const{loading,productData}=UseProductCategory(category);
//   async function getData() {
//     try {
//       let apiData = await fetch(
//         `https://dummyjson.com/products/category/${category}`,
//       );
//       let jsonData = await apiData.json();
//       setProductData(jsonData.products);
//       dispatch(addProductCategory({
//   category: category,
//   products: jsonData.products
// }));
//       console.log(jsonData);
      
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {

//     const cacheData=productCategoryMap[category];
//     if(cacheData){
//       // console.log("cache");
//       setLoading(false);
//       setProductData(cacheData);

//     }else{
//       // console.log("api caled");
//       getData();
//     }
    
//   }, [category]);

  if (loading) {
    return <ProductCardSkeleton />;
  }

  const light = "flex justify-center items-center w-screen flex- z-10 flex-col";
  const dark =
    "flex bg-gray-500 justify-center items-center w-screen flex- z-10 flex-col";

  return (
    <div>
      <Navbar />
      <div className={theme == "light" ? light : dark}>
        <div className="flex justify-evenly w-screen min-h-screen flex-wrap gap-5 mt-7 z-10">
          {productData.map((pObj) => (
            <ProductCard key={pObj.id} data={pObj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;