import React, { useEffect, useState, useRef } from "react";
import image1 from "../Assests/image1.webp"
import image2 from "../Assests/image2.webp"
import image3 from "../Assests/image3.webp"
import image4 from "../Assests/image4.jpg"
import ChevronLeft from "../Icons/ChevronLeft";
import ChevronRight from "../Icons/ChevronRight";
import { useNavigate } from "react-router-dom";
let images = [{image: image1,url:"beauty"}, 
  {image:image2,url:"fragrances"} ,
 {image: image3, url: "furniture"},
  {image:image4,url:"groceries"},];
const Carousal = () => {
  const navigate=useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  function handleLeft(e) {
    e.stopPropagation();
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }

  function handleRight(e) {
     e.stopPropagation();
    setActiveIndex((activeIndex + 1) % images.length);
  }

  const timerRef = useRef(null);

  function clearTimmer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }
function addTimmer() {
  timerRef.current = setInterval(() => {
    // console.log("timer calling")
    setActiveIndex((prev) => {
      return (prev + 1) % images.length;
    });
  }, 3000);
}
useEffect(() => {
  clearTimmer();
  addTimmer();
  return clearTimmer;
}, []);

function handleMouseEnter() {
clearTimmer();
}

function handleMouseLeave() {
clearTimmer();
addTimmer();
}

function handleClick(){
navigate(`/category/${images[activeIndex].url}`);
}
return (
  <div onClick={handleClick}
  onMouseEnter={handleMouseEnter} 
  onMouseLeave={handleMouseLeave} 
  className="h-[50vh] w-screen relative">
    <div
      onClick={(e)=>{
        handleLeft(e);
      }}
      className="bg-white h-10 w-8 absolute left-0 flex justify-center items-center  top-[20vh] "
    >
      <ChevronLeft />
    </div>
    <div
      onClick={(e)=>{
        handleRight(e);
      }}
      className="bg-white h-10 w-8 absolute right-0 flex justify-center items-center  top-[20vh] "
    >
      <ChevronRight />
    </div>
    <div className="h-full w-full">
      <img className="h-full w-full" src={images[activeIndex].image} alt="" />
    </div>
  </div>
);
}

export default Carousal;