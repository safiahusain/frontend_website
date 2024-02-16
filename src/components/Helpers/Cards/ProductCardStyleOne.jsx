import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiRequest from "../../../../utils/apiRequest";
import auth from "../../../../utils/auth";
import languageModel from "../../../../utils/languageModel";
import settings from "../../../../utils/settings";
import { fetchCart } from "../../../store/Cart";
import { fetchCompareProducts } from "../../../store/compareProduct";
import { fetchWishlist } from "../../../store/wishlistData";
import LoginContext from "../../Contexts/LoginContexts";
import CheckProductIsExistsInFlashSale from "../../Shared/CheckProductIsExistsInFlashSale";
import ProductView from "../../SingleProductPage/ProductView";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";

const Redirect = ({ message, linkTxt }) => {
  return (
    <div className="flex space-x-2 items-center">
      <span className="text-sm text-qgray">{message && message}</span>
      <Link href="/cart">
        <span className="text-xs border-b border-blue-600 text-blue-600 mr-2 cursor-pointer">
          {linkTxt && linkTxt}
        </span>
      </Link>
    </div>
  );
};

export default function ProductCardStyleOne({ datas }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state) => state.wishlistData);
  const wishlist = wishlistData && wishlistData.wishlists;
  const wishlisted =
    wishlist && wishlist.data.find((id) => id.product.id === datas.id);

  const [arWishlist, setArWishlist] = useState(null);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [isProductInFlashSale, setData] = useState(null);
  const loginPopupBoard = useContext(LoginContext);
  useEffect(() => {
    if (websiteSetup) {
      const getId = websiteSetup.payload.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(datas.id)
      );
      if (getId) {
        setData(true);
      } else {
        setData(false);
      }
    }
  }, [websiteSetup]);
  const [quickViewModal, setQuickView] = useState(false);
  const [quickViewData, setQuickViewData] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const quickViewHandler = (slug) => {
    setQuickView(!quickViewModal);
    if (!quickViewData) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product/${slug}`)
        .then((res) => {
          setQuickViewData(res.data ? res.data : null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (quickViewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [quickViewModal]);

  useEffect(() => {
    if (wishlisted) {
      setArWishlist(true);
    } else {
      setArWishlist(false);
    }
  }, [wishlisted]);
  const available =
    (datas.cam_product_sale /
      (datas.cam_product_available + datas.cam_product_sale)) *
    100;

  const addToWishlist = (id) => {
    if (auth()) {
      setArWishlist(true);
      apiRequest.addToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const removeToWishlist = (id) => {
    if (auth()) {
      setArWishlist(false);
      apiRequest.removeToWishlist({ id: id, token: auth().access_token });
      dispatch(fetchWishlist());
    } else {
      router.push("/login");
    }
  };
  // cart
  const varients = datas && datas.variants.length > 0 && datas.variants;
  const [getFirstVarients, setFirstVarients] = useState(
    varients && varients.map((v) => v.active_variant_items[0])
  );
  const [price, setPrice] = useState(null);
  const [offerPrice, setOffer] = useState(null);
  const [holditem, setHolditem] = useState([]);

  const addToCart = (id, holddata) => {
    let cart = [];
    let prev_data = localStorage.getItem("data-hold");

    if (prev_data) {
      let array = JSON.parse(prev_data);
      if (array?.length > 0) {
        cart = array;
      }
    }

    const data = {
      id: id,
      type: "add-to-cart",
      product: holddata,
      token: auth() && auth().access_token,
      quantity: 1,
      variants:
        getFirstVarients &&
        getFirstVarients.length > 0 &&
        getFirstVarients.map((v) =>
          v ? parseInt(v.product_variant_id) : null
        ),
      variantItems:
        getFirstVarients &&
        getFirstVarients.length > 0 &&
        getFirstVarients.map((v) => (v ? v.id : null)),
    };

    if (!haveInCart(data, cart)) {
      cart.push(data);
    }

    if (auth()) {
      if (varients) {
        const variantQuery = data.variants.map((value, index) => {
          return value ? `variants[]=${value}` : `variants[]=-1`;
        });

        const variantString = variantQuery.map((value) => value + "&").join("");

        const itemsQuery = data.variantItems.map((value, index) => {
          return value ? `items[]=${value}` : `items[]=-1`;
        });
        const itemQueryStr = itemsQuery.map((value) => value + "&").join("");
        const uri = `token=${data.token}&product_id=${data.id}&${variantString}${itemQueryStr}quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(
              <Redirect
                message={langCntnt && langCntnt.Item_added}
                linkTxt={langCntnt && langCntnt.Go_To_Cart}
              />,
              {
                autoClose: 5000,
              }
            )
          )
          .catch((err) => {
            console.log(err);
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      } else {
        const uri = `token=${data.token}&product_id=${data.id}&quantity=${data.quantity}`;
        apiRequest
          .addToCard(uri)
          .then((res) =>
            toast.success(
              <Redirect
                message={langCntnt && langCntnt.Item_added}
                linkTxt={langCntnt && langCntnt.Go_To_Cart}
              />,
              {
                autoClose: 5000,
              }
            )
          )
          .catch((err) => {
            console.log(err);
            toast.error(
              err.response &&
                err.response.data.message &&
                err.response.data.message
            );
          });
        dispatch(fetchCart());
      }
    } else {
      localStorage.setItem("data-hold", JSON.stringify(cart));
      loginPopupBoard.handlerPopup(false);
    }
  };

  function haveInCart(data, cart) {
    if (cart.length > 0) {
      for (let x of cart) {
        if (x.id == data.id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (varients) {
      const prices = varients.map((v) =>
        v.active_variant_items.length > 0 && v.active_variant_items[0].price
          ? v.active_variant_items[0].price
          : 0
      );

      if (datas.offer_price) {
        const sumOfferPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
            parseFloat(datas.offer_price)
        );
        setPrice(datas.price);
        setAmount(datas.price);
        setOffer(sumOfferPrice);
      } else {
        const sumPrice = parseFloat(
          prices.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0) +
            parseFloat(datas.price)
        );
        setPrice(sumPrice);
        setAmount(sumPrice);
      }
    } else {
      setPrice(datas && datas.price ? parseFloat(datas.price) : null);
      setAmount(datas && datas.price ? parseFloat(datas.price) : null);
      setOffer(
        datas && datas.offer_price ? parseFloat(datas.offer_price) : null
      );
    }
  }, [datas, varients]);
  const productCompare = (id) => {
    if (auth()) {
      apiRequest
        .addProductForCompare(id, auth().access_token)
        .then((res) => {
          toast.success(res.data && res.data.notification);
          dispatch(fetchCompareProducts());
        })
        .catch((err) => {
          toast.error(err.response && err.response.data.notification);
          console.log(err);
        });
    } else {
      loginPopupBoard.handlerPopup(true);
    }
  };
  const { currency_icon } = settings();
  const [imgSrc, setImgSrc] = useState(null);

  const loadImg = (value) => {
    setImgSrc(process.env.NEXT_PUBLIC_BASE_URL + value?.image_1);
  };

  const [amount, setAmount] = useState(null);
  const exchangeRate = JSON.parse(localStorage.getItem("selectedRate")) || 0;
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);

  const convertAmount = (amount, rate) => {
    return amount * rate;
  };

  useEffect(() => {
    setConvertedAmount(convertAmount(amount, exchangeRate.rate));
  }, [amount, exchangeRate.rate]);

  const roundedResult = Math.round(convertedAmount * 100) / 100;
  const convertedPrice = convertedAmount.toFixed(2);

  const { logo } = settings();
  let logosrc = datas.brand ? datas.brand.logo : logo;

  return (
    <>
      <Link
        href={{
          pathname: "/single-product",
          query: { slug: datas.slug },
        }}
        passHref
      >
        <a rel="noopener noreferrer">
          <div
            className="product-card-one w-full h-[550px] transition-all duration-300 ease-in-out bg-white relative group border border-transparent overflow-hidden rounded-lg"
            style={{
              boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="product-card-img w-full h-[313px]">
                  <div className="w-full h-full relative  flex justify-center items-center transition-all duration-700 ease-in-out transform group-hover:-scale-x-[1] scale-x-100">
                    <Image
                      layout="fill"
                      objectFit="scale-down"
                      src={`${imgSrc ? imgSrc : "/assets/images/spinner.gif"}`}
                      alt=""
                      onLoadingComplete={() => loadImg(datas?.image)}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="product-card-details relative pt-5 px-[10px]">
                  <div className="flex justify-between p-2 items-center border-t-[1px] border-[#D9D9D4] border-b-[1px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL + logosrc}`}
                      width={"100"}
                      height={"50"}
                      objectFit="scale-down"
                      alt="brand-logo"
                    />
                    <div className="wishlist">
                      {!arWishlist ? (
                        <button
                          className="transform transition-all duration-300 ease-in-out"
                          type="button"
                          onClick={() => addToWishlist(datas.id)}
                        >
                          <span className="w-10 h-10 block text-qblack transition-all duration-300 ease-in-out bg-white rounded-full">
                            <span className="w-full h-full flex justify-center items-center hover:bg-qpurple bg-qpurplelow/10 rounded-full">
                              <ThinLove className="fill-current" />
                            </span>
                          </span>
                        </button>
                      ) : (
                        <button
                          className="transform scale-0 transition-all duration-300 ease-in-out"
                          type="button"
                          onClick={() =>
                            removeToWishlist(wishlisted && wishlisted.id)
                          }
                        >
                          <span className="w-10 block h-10 rounded-full overflow-hidden">
                            <span className="flex w-full h-full justify-center items-center bg-qpurplelow/10">
                              <ThinLove fill={true} />
                            </span>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  <Link
                    href={{
                      pathname: "/single-product",
                      query: { slug: datas.slug },
                    }}
                    passHref
                  >
                    <a rel="noopener noreferrer">
                      <h1 className="title mb-1.5 mt-2 text-[19px] font-600 text-qblack leading-[30px] line-clamp-2 hover:text-qpurple cursor-pointer text-start">
                        {datas.title}
                      </h1>
                    </a>
                  </Link>

                  <div className="flex justify-start mb-1.5">
                    <div className="reviews flex space-x-[1px]">
                      {Array.from(Array(datas.review), () => (
                        <span key={datas.review + Math.random()}>
                          <Star />
                        </span>
                      ))}
                      {datas.review < 5 && (
                        <>
                          {Array.from(Array(5 - datas.review), () => (
                            <span
                              key={datas.review + Math.random()}
                              className="text-qgray"
                            >
                              <Star defaultValue={false} />
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <p className="price text-start">
                    <span
                      suppressHydrationWarning
                      className={`main-price font-500 text-[16px]${
                        offerPrice ? " line-through text-qgray" : "text-qpurple"
                      }`}
                    >
                      {offerPrice ? (
                        <span>
                          {exchangeRate.code && exchangeRate.rate
                            ? exchangeRate.code +
                              parseFloat(convertedPrice).toFixed(2)
                            : currency_icon + parseFloat(price).toFixed(2)}
                        </span>
                      ) : (
                        <>
                          {isProductInFlashSale && (
                            <span
                              className={` line-through text-qgray font-400 text-[15px] mr-2`}
                            >
                              {exchangeRate.code && exchangeRate.rate
                                ? exchangeRate.code +
                                  parseFloat(convertedPrice).toFixed(2)
                                : currency_icon + parseFloat(price).toFixed(2)}
                            </span>
                          )}
                          <CheckProductIsExistsInFlashSale
                            id={datas.id}
                            price={price}
                          />
                        </>
                      )}
                    </span>
                    {offerPrice && (
                      <span
                        suppressHydrationWarning
                        className="offer-price text-qpurple font-500 text-[16px] ml-2"
                      >
                        <CheckProductIsExistsInFlashSale
                          id={datas.id}
                          price={offerPrice}
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {/* add to card button */}
              <div className="">
                <div
                  onClick={() => addToCart(datas.id, datas)}
                  className="text-center w-full h-[48px] pl-6 pt-3 cursor-pointer bg-qpurple group-hover:bg-[#75652d] transition-all duration-300 ease-in-out"
                >
                  <div className="w-full h-full space-x-3 text-qpurple group-hover:text-white text-white">
                    <span className="text-base font-700 uppercase">
                      Add To Cart
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* quick-access-btns */}
            <div className="quick-access-btn">
              <button
                className=" absolute left-[77px] top-[243px] transform scale-0 group-hover:scale-100  transition-all ease-in-out"
                onClick={() => quickViewHandler(datas.slug)}
                type="button"
              >
                <span className="w-10 h-10 block overflow-hidden  text-qblack hover:text-white  transition-all duration-300 ease-in-out hover:bg-qpurple bg-white  rounded-full">
                  <span className=" w-full h-full bg-qpurplelow/10 flex justify-center items-center">
                    <QuickViewIco className="fill-current" />
                  </span>
                </span>
              </button>
              <button
                className=" absolute left-[160px] top-[243px] transform scale-0 group-hover:scale-100  transition-all duration-500 ease-in-out"
                type="button"
                onClick={() => productCompare(datas.id)}
              >
                <span className="w-10 h-10 block  text-qblack hover:text-white transition-all overflow-hidden duration-300 ease-in-out items-center bg-white rounded-full">
                  <span className="w-full h-full flex justify-center items-center hover:bg-qpurple bg-qpurplelow/10 ">
                    <Compair />
                  </span>
                </span>
              </button>
            </div>
            {quickViewModal && quickViewData && (
              <div className="quicke-view-wrapper w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center ">
                <div
                  onClick={() => setQuickView(!quickViewModal)}
                  className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
                ></div>
                <div
                  data-aos="fade-up"
                  className="md:mx-10 xl:mt-[100px] rounded w-full bg-white relative lg:py-[40px] pt-[80px] pb-[40px] sm:px-[38px] px-3 relative md:mt-12 h-full overflow-y-scroll xl:overflow-hidden  xl:mt-0"
                  style={{ zIndex: "999" }}
                >
                  <div className="w-full h-full overflow-y-scroll overflow-style-none">
                    <ProductView
                      images={
                        quickViewData.gellery.length > 0
                          ? quickViewData.gellery
                          : []
                      }
                      product={quickViewData.product}
                    />
                  </div>

                  <button
                    onClick={() => setQuickView(!quickViewModal)}
                    type="button"
                    className="absolute right-3 top-3"
                  >
                    <span className="text-red-500 w-12 h-12 flex justify-center items-center rounded border border-qred">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </a>
      </Link>
    </>
  );
}
