import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import SimpleSlider from "../Helpers/SliderCom";

export default function BrandSection({ className, sectionTitle, brands = [] }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    slidesToShow: 7,
    slidesToScroll: 3,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: window.innerWidth < 600 ? "0px" : "-50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul
          className="brand-slider-dots"
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
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <>
      <div className="bg-[#fff]">
        <div
          data-aos="fade-up"
          className={`w-full md:!mb-0 md:pb-[135px] pt-[20px] ${
            className || ""
          }`}
        >
          <div className="container-x mx-auto">
            <SimpleSlider settings={settings} selector={sliderRef}>
              {brands.map((datas, index) => {
                return (
                  <div key={datas.id}>
                    <div style={{ margin: "0 20px" }}>
                      <Link
                        href={{
                          pathname: "/products",
                          query: { brand: datas.slug },
                        }}
                      >
                        <div className="w-full h-[200px] group transition duration-300 ease-in-out bg-white flex justify-center items-center relative cursor-pointer">
                          <div className="grayscale group-hover:grayscale-0 relative w-full h-full">
                            <Image
                              className="brand-logo-slider"
                              layout="fill"
                              src={`${
                                process.env.NEXT_PUBLIC_BASE_URL + datas.logo
                              }`}
                              alt={datas.name}
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
