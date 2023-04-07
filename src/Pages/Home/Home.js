import React, { useContext } from "react";
import { productProvider } from "../../Context/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const { products } = useContext(productProvider);
  return (
    <div className="container">
      <Slider {...settings} className="my-10">
        {products?.slice(0, 2).map((product) => (
          <div>
            <img
              className="max-h-[500px] mx-auto object-cover"
              src={product?.picture}
              alt="Slider 1"
            />
          </div>
        ))}
      </Slider>

      {/* featured products */}
      <FeaturedProducts></FeaturedProducts>
    </div>
  );
};

export default Home;
