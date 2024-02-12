import { useRef } from "react";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import SimpleSlider from "../Helpers/SliderCom";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, left: "-50px", zIndex: 1, color: "black" }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, right: "-50px", zIndex: 1 }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

export default function TabsSlider({ className, data }) {
  const sliderRef = useRef(null);
  const settings = {
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul
          style={{
            margin: "0",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  console.log(data, "data...");

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="main-wrapper w-full h-full">
          {/*    slider area*/}
          <div className="hero-slider-wrapper h-full mb-20 w-full relative">
            <SimpleSlider settings={settings} selector={sliderRef}>
              {data &&
                data?.map((product, index) => (
                  <div key={index}>
                    <div style={{ margin: "0 5px" }}>
                      <ProductCardStyleOne datas={product} />
                    </div>
                  </div>
                ))}
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
