import React, {  useContext, useState } from "react";
import ChevronDown from "../Icons/ChevronDown";
import ChevronUp from "../Icons/ChevronUp";
import { ThemeContext } from "../Store/ThemeProvider";
const ProductReviews = ({ reviews }) => {
  const [activeIndex, setActivIndex] = useState(null);
 
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="space-y-6">
        {reviews.map((review, index) => {
          return <ReviewAccordian
            review={review}
            index={index}
            activeIndex={activeIndex}
            setActivIndex={setActivIndex}
          />
        })}
      </div>
    </div>
  );
}

export default ProductReviews;

const ReviewAccordian = ({ review, index, activeIndex, setActivIndex }) => {
  const {theme} =useContext(ThemeContext);
  let { reviewerName, rating, comment } = review;
  const light="border rounded-lg p-4 bg-gray-50 text-black";
  const dark="border rounded-lg p-4 bg-gray-700 text-white";
  return (
    <div key={index} className={theme =="light"?light : dark }>
      <div
        onClick={() => {
          activeIndex == index ? setActivIndex(null) : setActivIndex(index);
        }}
        className="flex justify-between">

        <div className="flex">
          <h4 className="font-semibold">{reviewerName}</h4>
          <span className="text-yellow-500">⭐ {rating}</span>
        </div>
        {index == activeIndex ? <ChevronUp /> : <ChevronDown />}
      </div>
      {index == activeIndex && < p className={theme== "light" ?"text-gray-600 mt-2":"text-gray-300 mt-2"}>{comment}</p>}
    </div>
  )
}