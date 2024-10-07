import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import s1 from '../Slider/s1.png';
import s2 from '../Slider/s2.jpg';
import s3 from '../Slider/s3.jpg';
const AutoImageSlider = () => {
  const images = [s1,s2,s3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Transition speed in ms (adjusted to be faster)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Auto slide functionality
    autoplaySpeed: 3000, // Time in ms between slides
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "auto" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide-${index}`} style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoImageSlider;


// import React, { useEffect, useState } from 'react';

// const images = [
//   "https://wowslider.com/sliders/demo-18/data1/images/hongkong1081704.jpg",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1x6B6jQs119paou7zMMCVMigMrlINp6zXXIEZC7mGdEtNj8wOPbBaK_d8VcXRbYEUBS0&usqp=CAU",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQre_cvfd08vZbbwb58tG6U463uGhKI8ms6Jp_Ueo9J1LU15yjqr0QHjuyJ2BPco3U_gRs&usqp=CAU"
// ];

// const AutoImageSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000); // Slide every 3 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <div>
//       <div className="slider">
//         <img
//           src={images[currentIndex]}
//           alt={`slide-${currentIndex}`}
//           style={{ width: '100%', height: '300px' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AutoImageSlider;
