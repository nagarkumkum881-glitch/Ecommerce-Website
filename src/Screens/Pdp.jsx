// import React, { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import { useParams } from "react-router-dom";
// const Pdp = () => {
//   const {id} =useParams();
//  const[productData,setProductData]=useState(null);

//  async function getData() {
//   try {

//   } catch (error) {

//   }
//  }
//  useEffect(()=>{
//   getData();
//  })

//   return (
//     <><Navbar hideSearchBar={true}/>
//     </>
//     );
// }

// export default Pdp;



import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import PdpSkeleton from "../Components/PdpSkeleton";
import ProductReviews from "../Components/ProductReviews";
import { ThemeContext } from "../Store/ThemeProvider";
import UseGetProductById from "../Hooks/UseGetProductById";
import UseWishlistproduct from "../Hooks/UseWishlistproduct";
import UseCartProduct from "../Hooks/UseCartProduct";
// import { useSelector, useDispatch } from "react-redux";
// import { addProductDataById } from "../app/ProductSlice";


const Pdp = () => {
  // const productDataMap = useSelector((state) => state.product.productDataMap);
  // const dispatch = useDispatch();
  // console.log("allProductData", productDataMap);
  const { id } = useParams();
  const { loading, error, productData } = UseGetProductById(id);
  // const [productData, setProductData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
   const { handleCartProduct, isProductInCart } = UseCartProduct(id);
  const { isProductInWishlist, handleWishlist } = UseWishlistproduct(productData)
  const [selectedImage, setSelectedImage] = useState(null);
  const { theme } = useContext(ThemeContext);
  // async function getData() {
  //   try {
  //     let apiData = await fetch(`https://dummyjson.com/products/${id}`);
  //     let jsonData = await apiData.json();
  //     setProductData(jsonData);
  //     dispatch(addProductDataById([jsonData]));// saving the data in redux store 
  //     setSelectedImage(jsonData.thumbnail);
  //   } catch (err) {
  //     setError("Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   if (id) {
  //     const cacheData = productDataMap[id];

  //     if (cacheData) {
  //       setLoading(false);
  //       setProductData(cacheData);
  //       setSelectedImage(cacheData.thumbnail);
  //     } else {
  //       getData();
  //     }
  //   } else {
  //     setError("Product Id not found");
  //     setLoading(false);
  //   }
  // }, [id]);

  useEffect(() => {
    if (!loading && productData.thumbnail) {
      setSelectedImage(productData.thumbnail);
    }
  }, [productData]);

  const discountedPrice =
    productData &&
    (
      productData.price -
      (productData.price * productData.discountPercentage) / 100
    ).toFixed(2);

  const light = "max-w-7xl mx-auto px-6 py-10 bg-white text-black";
  const dark = "max-w-7xl mx-auto px-6 py-10 bg-gray-500 text-white";

  return (
    <>
      <Navbar hideSearchBar={true} />

      {loading && <PdpSkeleton />}

      {error && (
        <div className="text-center py-20 text-red-500 text-xl font-semibold">
          {error}
        </div>
      )}

      {!loading && !error && productData && (
        <div className={theme == "light" ? light : dark}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image Section */}
            <div>
              <div className={theme == "light" ? "border rounded-xl p-4 bg-white shadow" : "border rounded-xl p-4 bg-gray-300 shadow"}>
                <img
                  src={selectedImage}
                  alt={productData.title}
                  className="w-full h-96 object-contain"
                />
              </div>

              <div className="flex gap-4 mt-4">
                {productData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 object-cover rounded-md cursor-pointer border ${selectedImage === img ? "border-black" : "border-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-5">
              <h1 className="text-3xl font-bold">{productData.title}</h1>

              <p className={theme == "light" ? "text-gray-500" : "text-gray-300"}>
                Brand: <span className="font-medium">{productData.brand}</span>
              </p>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-green-600">
                  ${discountedPrice}
                </span>
                <span className="line-through text-gray-400">
                  ${productData.price}
                </span>
                <span className="text-red-500">
                  ({productData.discountPercentage}% OFF)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⭐</span>
                <span>{productData.rating}</span>
              </div>

              <p className={theme == "light" ? "text-gray-600 leading-relaxed" : "text-gray-300 leading-relaxed"}>
                {productData.description}
              </p>

              <div className={theme == "light" ? "space-y-2 text-sm text-gray-600" : "space-y-2 text-sm text-gray-300"}>
                <p>📦 Stock: {productData.stock}</p>
                <p>🚚 {productData.shippingInformation}</p>
                <p>🔁 {productData.returnPolicy}</p>
                <p>🛡 {productData.warrantyInformation}</p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCartProduct}
                  style={{
                    backgroundColor: isProductInCart ? "#4CBB17" : "white",
                    borderColor: isProductInCart ? "transparent" : "black",
                    color: isProductInCart ? "white" : "black",
                    width: "50%",
                  }}
                  className="border  px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {isProductInCart ? "Remove from Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={handleWishlist}
                  style={{
                    backgroundColor: isProductInWishlist ? "#D62828" : "white",
                    borderColor: isProductInWishlist ? "transparent" : "black",
                    color: isProductInWishlist ? "white" : "black",
                    width: "50%",
                  }}
                  className="border  px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  {isProductInWishlist
                    ? "Remove from wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section 
             <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

           <div className="space-y-6">
//               {productData.reviews.map((review, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{review.reviewerName}</h4>
                    <span className="text-yellow-500">⭐ {review.rating}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>  */}
          <ProductReviews reviews={productData.reviews} />
        </div>

      )}
    </>
  );
};

export default Pdp;