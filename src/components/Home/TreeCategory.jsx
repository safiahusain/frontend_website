import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Finnance from "../../../public/assets/images/finnance.svg";
import Phone from "../../../public/assets/images/phone.svg";
import Stocksvg from "../../../public/assets/images/stock.svg";
import world from "../../../public/assets/images/world.svg";
import TabSlider from "../FavouritProducts/TabsSlider";
import LoaderStyleTwo from "../Helpers/Loaders/LoaderStyleTwo";
import SimpleSlider from "../Helpers/SliderCom";
function TreeCategory({ categories = [], products = [] }) {
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const categoryList = websiteSetup && websiteSetup.payload.productCategories;
  const [load, setLoad] = useState(false);

  const [selectedTab, setSelectedTab] = useState(
    categories.length > 0 && parseInt(categories[0].category_id)
  );

  const [selectedId, setId] = useState(
    categories.length > 0 && parseInt(categories[0].category_id)
  );

  const isValidURL = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const parseThumbImage = (thumbImage) => {
    if (isValidURL(thumbImage)) {
      return JSON.parse(thumbImage);
    } else {
      return JSON.parse(thumbImage);
    }
  };

  const cp =
    products.length > 0 &&
    products?.map((item) => {
      return {
        id: item.id,
        category_id: item.category_id,
        title: item.name,
        slug: item.slug,
        image: parseThumbImage(item.thumb_image),
        price: item.price,
        offer_price: item.offer_price,
        campaingn_product: null,
        review: parseInt(item.averageRating),
        variants: item.active_variants ? item.active_variants : [],
        brand: item.brand,
      };
    });

  const handleTabClick = (tabNumber) => {
    setLoad(true);
    setTimeout(() => {
      setId(parseInt(tabNumber.category_id));
      setSelectedTab(parseInt(tabNumber.category_id));
      setLoad(false);
    }, 300);
  };

  const [filterProducts, setProducts] = useState();
  cp && cp.filter((item) => item.category_id === selectedId);

  useEffect(() => {
    if (cp) {
      const products = cp.filter(
        (item) => parseInt(item.category_id) === selectedId
      );
      setProducts(products);
    }
  }, [selectedId]);

  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: false,
    arrows: false,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="tree-category mt-[45px] relative w-full">
        <div className="xl:w-[1350px] lg:w-[1350px] md:w-[1350px] sm:w-full xsm:w-full xxs:w-full xxxs:w-full mx-auto">
          <div className="tree-box block" data-aos="fade-up">
            <div className="tree-inner-box mb-10">
              <SimpleSlider settings={settings} selector={sliderRef}>
                <div className="!flex items-start gap-3 w-full justify-center ">
                  <Image
                    src={Phone}
                    width="40"
                    height={"40"}
                    alt="Order Now!"
                  />
                  <div style={{ lineHeight: "20px" }}>
                    <span
                      className="text-[14px] font-[600]"
                      style={{ lineHeight: "0px" }}
                    >
                      <b className="uppercase">Order Now!</b>
                      <br />
                      <a
                        href="tel:+441392 354 854"
                        className="text-[14px] font-[400] hover:underline underline-offset-2"
                      >
                        Tel:{websiteSetup?.payload?.footer?.phone}
                      </a>
                    </span>
                  </div>
                </div>
                <div className="!flex items-start gap-3 w-full justify-center ">
                  <Image
                    src={world}
                    width="40"
                    height={"40"}
                    alt="gcc countries LARGEST"
                  />
                  <div style={{ lineHeight: "20px" }}>
                    <span
                      className="text-[14px] font-[600]"
                      style={{ lineHeight: "0px" }}
                    >
                      <b className="uppercase">gcc countries LARGEST</b>
                      <br />
                      <span className="text-[14px] font-[400]">
                        Gun & Accessories shop
                      </span>
                    </span>
                  </div>
                </div>
                <div className="!flex items-start gap-3 w-full justify-center ">
                  <Image
                    src={Finnance}
                    width="40"
                    height={"40"}
                    alt="PRICE MATCH"
                  />
                  <div style={{ lineHeight: "20px" }}>
                    <Link href="/pages?custom=price-match-endeavor" passHref>
                      <a
                        rel="noopener noreferrer"
                        className="text-[14px] font-[600] hover:underline underline-offset-2"
                        style={{ lineHeight: "0px" }}
                      >
                        <b className="uppercase">PRICE MATCH ENDEAVOR</b>
                        <br />
                        <span className="text-[14px] font-[400]">
                          For Big Savings
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="!flex items-start gap-3 w-full justify-center ">
                  <Image
                    src={Stocksvg}
                    width="40"
                    height={"40"}
                    alt="OVER 100K PRODUCTS"
                  />
                  <div style={{ lineHeight: "20px" }}>
                    <span
                      className="text-[14px] font-[600]"
                      style={{ lineHeight: "0px" }}
                    >
                      <b className="uppercase">OVER 100K PRODUCTS</b>
                      <br />
                      <span className="text-[14px] font-[400]">
                        In Stock & Ready To Shop
                      </span>
                    </span>
                  </div>
                </div>
              </SimpleSlider>
            </div>
          </div>

          <div
            data-aos="fade-up"
            className="tree-product-box xl:w-full lg:w-[70%] md:w-[50%] sm:w-[70%] xsm:w-[90%] xxs:w-[90%] xxxs:w-[95%] xl:mx-auto lg:mx-[40px] md:mx-[50px] sm:mx-[40px] xsm:mx-[20px] xxs:mx-[20px] xxxs:mx-[10px]  place-content-center	place-items-center grid gap-4 mb-20 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xsm:grid-cols-2 xxs:grid-cols-2 xxxs:grid-cols-1"
          >
            {categoryList?.slice(0, 4).map((data, index) => (
              <div key={index} className="w-full">
                <a
                  href={`products?category=${data.slug}`}
                  className="tree-pro-container block relative group"
                >
                  <Image
                    className="tree-pro-img"
                    src={process.env.NEXT_PUBLIC_BASE_URL + data.image}
                    alt="gun"
                    loading="lazy"
                    quality={100}
                    layout="responsive"
                    width={315}
                    height={440}
                    objectFit="cover"
                  />
                  <p className="product-title text-center  bg-opacity-60 text-white p-2">
                    {data.name}
                  </p>
                  <div className="overlay absolute inset-0 bg-black bg-opacity-40 transition-opacity opacity-0 group-hover:opacity-100"></div>
                  <div className="shop-button inset-0 opacity-0 group-hover:opacity-100">
                    <a
                      href={`products?category=${data.slug}`}
                      className="text-white font-bold shop-button-item"
                    >
                      Shop Now
                    </a>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div data-aos="fade-up">
        <div className="flex justify-center">
          <h2 className="text-center mt-[10px] mb-[40px] w-full text-[35px] font-[700] text-[#1A3336]">
            OUR FAVOURITES
          </h2>
        </div>
        <div className="block">
          <div className="mt-4">
            <div className="flex justify-center mb-8">
              {categories?.slice(0, 3).map((data) => (
                <button
                  key={data.id}
                  className={`px-4 py-2 font-[700] text-[18px] text-opacity-40 text-black border-b-[3px] border-transparent ${
                    selectedTab == data.category_id
                      ? "border-b-[3px] !border-qpurple font-[700] text-[18px] !text-opacity-100 text-[#072426]"
                      : ""
                  }`}
                  onClick={() => handleTabClick(data)}
                >
                  {data.category.name}
                </button>
              ))}
            </div>
            {load === false ? (
              <div className="mt-4 xl:w-[1300px] lg:w-[870px] md:w-[600px] sm:w-full xsm:w-full xxs:w-full xxxs:w-full mx-auto">
                {selectedTab === selectedId && (
                  <TabSlider data={filterProducts} />
                )}
              </div>
            ) : (
              <div className="loading  h-[445px] flex justify-center items-center col-span-4">
                <LoaderStyleTwo />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TreeCategory;
