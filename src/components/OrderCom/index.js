import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import isAuth from "../../../Middleware/isAuth";
import apiRequest from "../../../utils/apiRequest";
import auth from "../../../utils/auth";
import languageModel from "../../../utils/languageModel";
import settings from "../../../utils/settings";
import BreadcrumbCom from "../BreadcrumbCom";
import InputCom from "../Helpers/InputCom";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import LoaderStyleTwo from "../Helpers/Loaders/LoaderStyleTwo";
import StarRating from "../Helpers/StarRating";
import Layout from "../Partials/Layout";
function OrderCom() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(true);
  const { id } = router.query;
  const [resData, setResData] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  useEffect(() => {
    const g_user = JSON.parse(localStorage.getItem("gust_user"));
    if (auth()) {
      if (!resData) {
        axios
          .get(
            `${
              process.env.NEXT_PUBLIC_BASE_URL
            }api/user/order-show/${id}?token=${auth().access_token}`
          )
          .then((res) => {
            setResData(res.data && res.data.order);
            setLoadingState(false);
            const status = () => {
              switch (
                res.data &&
                res.data.order &&
                parseInt(res.data.order.order_status)
              ) {
                case 0:
                  return "Pending";
                case 1:
                  return "Progress";
                case 2:
                  return "Delivered";
                case 3:
                  return "Completed";
                case 4:
                  return "Declined";
                default:
                  return "Pending";
              }
            };
            setOrderStatus(status);
          })
          .catch((err) => {
            setLoadingState(false);
            console.log(err);
          });
      }
    } else {
      router.push(`/login`);
    }
  });
  const { currency_icon } = settings();
  const print = () => {
    window.print();
  };

  /*review*/
  const [reviewModal, setReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const reviewModalHandler = (id) => {
    setReviewModal(!reviewModal);
    setReviewId(id);
  };
  const reviewAction = () => {
    setLoading(true);
    if (auth()) {
      apiRequest
        .productReview(
          {
            rating: rating,
            product_id: reviewId,
            review: message,
          },
          auth().access_token
        )
        .then((res) => {
          toast.success(res.data && res.data.message);
          setLoading(true);
          setName("");
          setMessage("");
          setRating(0);
          setHover(0);
          setReviewId(null);
          setReviewModal(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.response && err.response.data.errors) {
            toast.error(langCntnt && langCntnt.Invalid_data);
          }
          if (err.response && err.response.data.message) {
            toast.error(err.response.data.message);
          }
        });
    } else {
      setLoading(true);
    }
  };

  const exchangeRate = JSON.parse(localStorage.getItem("selectedRate")) || 0;
  const convertAmount = (amount, rate) => {
    return amount * rate;
  };
  return (
    <>
      <Layout childrenClasses="pt-0 pb-0">
        <div className="order-tracking-wrapper w-full pt-[60px] pb-[114px]">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.Order, path: `/order/${id}` },
              ]}
            />
            {!loadingState ? (
              <>
                {resData && (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="w-full h-[168px]  bg-qpurplelow/10 rounded-2xl mb-10 relative print:hidden"
                  >
                    <div className="w-full px-10 flex justify-between pt-3 mb-7">
                      <div>
                        {resData.order_delivered_date && (
                          <p className="text-base font-400">
                            {langCntnt && langCntnt.Delivered_on}{" "}
                            {resData.order_delivered_date}
                          </p>
                        )}
                      </div>
                      <div>
                        {orderStatus === "Declined" && (
                          <p className="text-base font-bold text-qred mr-10">
                            {langCntnt && langCntnt.Your_order_is_declined}!
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex lg:space-x-[373px] space-x-[90px] w-full h-full justify-center">
                      <div className="relative">
                        <div className="w-[30px] h-[30px] border-[8px] rounded-full border-qpurple bg-white relative z-20"></div>
                        <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                          {langCntnt && langCntnt.Pending}
                        </p>
                      </div>
                      {/*orderStatus*/}
                      <div className="relative">
                        <div
                          className={`w-[30px] h-[30px] border-[8px] rounded-full  bg-white relative z-20 ${
                            orderStatus === "Progress" ||
                            orderStatus === "Delivered" ||
                            orderStatus === "Completed"
                              ? "border-qpurple"
                              : "border-qgray"
                          }`}
                        ></div>
                        <div
                          className={`lg:w-[400px] w-[100px] h-[8px] absolute lg:-left-[390px] -left-[92px] top-[10px] z-10  ${
                            orderStatus === "Progress" ||
                            orderStatus === "Delivered" ||
                            orderStatus === "Completed"
                              ? "bg-qpurple"
                              : "bg-white"
                          }`}
                        ></div>
                        <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                          {langCntnt && langCntnt.Progress}
                        </p>
                      </div>
                      <div className="relative">
                        <div
                          className={`w-[30px] h-[30px] border-[8px] rounded-full bg-white  relative z-20 ${
                            orderStatus === "Delivered" ||
                            orderStatus === "Completed"
                              ? "border-qpurple"
                              : "border-qgray"
                          }`}
                        ></div>
                        <div
                          className={`lg:w-[400px] w-[100px] h-[8px] absolute lg:-left-[390px] -left-[92px] top-[10px] z-10 ${
                            orderStatus === "Delivered" ||
                            orderStatus === "Completed"
                              ? "bg-qpurple"
                              : "bg-white"
                          }`}
                        ></div>
                        <p className="absolute -left-4 top-10 sm:text-base text-sm font-400">
                          {langCntnt && langCntnt.Delivered}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full min-h-screen">
                <div className="mt-20">
                  <LoaderStyleTwo />
                </div>
              </div>
            )}

            <div className="bg-white lg:p-10 p-3 rounded-xl">
              {resData && (
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                  id="printSection"
                >
                  <div className="sm:flex justify-between items-center mb-5">
                    <div>
                      <h1 className="text-[26px] font-semibold text-qblack mb-2.5">
                        {resData.order_address &&
                          resData.order_address.billing_name}
                      </h1>
                      <ul className="flex flex-col space-y-2">
                        <li className="text-[22px]n text-qgray">
                          {langCntnt && langCntnt.Order_ID}:{" "}
                          <span className="text-qpurple">
                            {resData.order_id}
                          </span>
                        </li>
                        <li className="text-[22px]n text-qgray">
                          {langCntnt && langCntnt.Billing_Address}:{" "}
                          <span className="text-qpurple">{`${
                            resData.order_address &&
                            resData.order_address.billing_address
                          },${
                            resData.order_address &&
                            resData.order_address.billing_city
                          },${
                            resData.order_address &&
                            resData.order_address.billing_state
                          }`}</span>
                        </li>
                        <li className="text-[22px]n text-qgray">
                          {langCntnt && langCntnt.Shipping_Address}:{" "}
                          <span className="text-qpurple">{`${
                            resData.order_address &&
                            resData.order_address.shipping_address
                          },${
                            resData.order_address &&
                            resData.order_address.shipping_city
                          },${
                            resData.order_address &&
                            resData.order_address.shipping_state
                          }`}</span>
                        </li>
                        <li className="text-[22px]n text-qgray">
                          {langCntnt && langCntnt.Type}:{" "}
                          <span className="text-qpurple">
                            {resData.order_address &&
                            parseInt(
                              resData.order_address.shipping_address_type
                            ) === 1
                              ? langCntnt && langCntnt.Office
                              : langCntnt && langCntnt.home}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <button
                        onClick={print}
                        type="button"
                        className="w-[161px] h-[52px] rounded flex space-x-2.5 items-center justify-center transition-common bg-qpurple hover:bg-qpurplelow/30 hover:text-qpurple text-white print:hidden mt-5 sm:mt-0"
                      >
                        <span>
                          <svg
                            width="27"
                            height="26"
                            viewBox="0 0 27 26"
                            fill="none"
                            className={`fill-current`}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M24.9 6.10885H22.0364V0.900017C22.0364 0.402996 21.6334 0 21.1364 0H5.86364C5.36662 0 4.96362 0.402943 4.96362 0.900017V6.10885H2.09999C0.942047 6.10885 0 7.05095 0 8.2089V17.2635C0 18.4214 0.942047 19.3635 2.09999 19.3635H4.96378V24.1947C4.96378 24.6917 5.36672 25.0947 5.8638 25.0947H21.1362C21.6332 25.0947 22.0362 24.6918 22.0362 24.1947V19.3635H24.9C26.058 19.3635 27 18.4214 27 17.2635V8.2089C27 7.05101 26.058 6.10885 24.9 6.10885ZM6.76361 1.80004H20.2363V6.10885H6.76361V1.80004ZM20.2362 23.2947H6.76382C6.76382 23.1188 6.76382 16.149 6.76382 15.9315H20.2362C20.2362 16.1545 20.2362 23.1256 20.2362 23.2947ZM21.1364 11.3936H18.8454C18.3484 11.3936 17.9454 10.9907 17.9454 10.4936C17.9454 9.99654 18.3483 9.5936 18.8454 9.5936H21.1364C21.6334 9.5936 22.0364 9.99654 22.0364 10.4936C22.0364 10.9907 21.6334 11.3936 21.1364 11.3936Z" />
                          </svg>
                        </span>
                        <span className="text-sm">
                          {langCntnt && langCntnt.Print_PDF}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="relative w-full overflow-x-auto overflow-style-none overflow-hidden rounded border border-qpurplelow/30 box-border mb-10">
                    <table className="w-full text-sm text-left text-qgray dark:text-gray-400">
                      <tbody>
                        {/* table heading */}
                        <tr className="text-[13px] font-medium text-qblack bg-qpurplelow/20 whitespace-nowrap px-2 border-b border-qpurplelow/30 uppercase">
                          <td className=" py-4 pl-10 block whitespace-nowrap  w-[380px]">
                            {langCntnt && langCntnt.Product}
                          </td>
                          <td className="py-4 whitespace-nowrap  text-center">
                            {langCntnt && langCntnt.quantity}
                          </td>
                          <td className="py-4 whitespace-nowrap text-center">
                            {langCntnt && langCntnt.Price}
                          </td>
                          <td className="py-4 whitespace-nowrap text-center">
                            {langCntnt && langCntnt.SUBTOTAL}
                          </td>
                          <td className="py-4 whitespace-nowrap text-center print:hidden">
                            {langCntnt && langCntnt.review}
                          </td>
                        </tr>
                        {/* table heading end */}
                        {resData.order_products.length > 0 &&
                          resData.order_products.map((item, i) => (
                            <tr
                              key={i}
                              className="bg-white border-b border-qpurplelow/30 hover:bg-qpurplelow/10 last:border-none"
                            >
                              <td className="pl-10 w-[400px] py-4 ">
                                <div className="flex space-x-6 items-center">
                                  <div className="flex-1 flex flex-col">
                                    <h1 className="font-medium text-[15px] text-qblack">
                                      {item.product_name}
                                    </h1>
                                  </div>
                                </div>
                              </td>
                              <td className=" py-4">
                                <div className="flex justify-center items-center">
                                  <div className="w-[54px] h-[40px] rounded justify-center flex items-center border border-qpurplelow/30">
                                    <span>{item.qty}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center py-4 px-2">
                                <div className="flex space-x-1 items-center justify-center">
                                  <span className="text-[15px] font-medium text-qblack">
                                    <span>
                                      {exchangeRate
                                        ? exchangeRate.code
                                        : currency_icon}
                                    </span>
                                    <span>
                                      {exchangeRate
                                        ? convertAmount(
                                            item.unit_price,
                                            exchangeRate.rate
                                          )
                                        : item.unit_price}
                                    </span>
                                  </span>
                                </div>
                              </td>
                              <td className="text-center py-4 px-2">
                                <div className="flex space-x-1 items-center justify-center">
                                  <span className="text-[15px] font-medium text-qblack">
                                    <span>
                                      {exchangeRate
                                        ? exchangeRate.code
                                        : currency_icon}
                                    </span>
                                    <span>
                                      {exchangeRate
                                        ? (
                                            convertAmount(
                                              item.unit_price,
                                              exchangeRate.rate
                                            ) * item.qty
                                          ).toFixed(2)
                                        : (item.unit_price * item.qty).toFixed(
                                            2
                                          )}
                                    </span>
                                  </span>
                                </div>
                              </td>
                              <td className="text-center py-4 px-2 print:hidden">
                                <button
                                  onClick={() =>
                                    reviewModalHandler(item.product_id)
                                  }
                                  type="button"
                                  className="text-qpurple  text-sm font-semibold capitalize"
                                >
                                  {langCntnt && langCntnt.review}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex sm:justify-end print:justify-end justify-center sm:mr-10">
                    <div>
                      <div className="flex justify-between font-semibold w-[200px] mb-2">
                        <p className="text-sm text-qblack">
                          {langCntnt && langCntnt.SUBTOTAL}
                        </p>
                        <p className="text-sm text-qblack">
                          <span>
                            {exchangeRate ? exchangeRate.code : currency_icon}
                          </span>
                          <span>
                            {exchangeRate
                              ? (
                                  convertAmount(
                                    resData.total_amount,
                                    exchangeRate.rate
                                  ) -
                                  convertAmount(
                                    resData.shipping_cost,
                                    exchangeRate.rate
                                  ) +
                                  convertAmount(
                                    resData.coupon_coast,
                                    exchangeRate.rate
                                  )
                                ).toFixed(2)
                              : parseInt(resData.total_amount) -
                                parseInt(resData.shipping_cost) +
                                parseInt(resData.coupon_coast)}
                          </span>

                          {/*  $sub_total = $order->total_amount;
                            $sub_total = $sub_total - $order->shipping_cost;
                            $sub_total = $sub_total + $order->coupon_coast;

                            */}
                        </p>
                      </div>
                      <div className="flex justify-between font-semibold w-[200px] mb-2">
                        <p className="text-sm text-qred">
                          (-) {langCntnt && langCntnt.Discount_coupon}
                        </p>
                        <p className="text-sm text-qred">
                          -
                          <span>
                            {exchangeRate ? exchangeRate.code : currency_icon}
                          </span>
                          <span>
                            {exchangeRate
                              ? convertAmount(
                                  resData.coupon_coast,
                                  exchangeRate.rate
                                )
                              : resData.coupon_coast}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between font-semibold w-[200px]">
                        <p className="text-sm text-qblack">
                          (+) {langCntnt && langCntnt.Shipping_Cost}
                        </p>
                        <p className="text-sm text-qblack">
                          +
                          <span>
                            {exchangeRate ? exchangeRate.code : currency_icon}
                          </span>
                          <span>
                            {exchangeRate
                              ? convertAmount(
                                  resData.shipping_cost,
                                  exchangeRate.rate
                                ).toFixed(2)
                              : resData.shipping_cost}
                          </span>
                        </p>
                      </div>

                      <div className="w-full h-[1px] bg-qpurplelow mt-4"></div>
                      <div className="flex justify-between font-semibold w-[200px] mt-4">
                        <p className="text-lg text-qblack">
                          {langCntnt && langCntnt.Total_Paid}
                        </p>
                        <p className="text-lg text-qblack">
                          <span>
                            {exchangeRate ? exchangeRate.code : currency_icon}
                          </span>
                          <span>
                            {exchangeRate
                              ? parseInt(
                                  convertAmount(
                                    resData.total_amount,
                                    exchangeRate.rate
                                  )
                                ).toFixed(2)
                              : parseInt(resData.total_amount)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>

      {reviewModal && (
        <div className="w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center">
          <div
            onClick={() => setReviewModal(!reviewModal)}
            className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
          ></div>
          <div
            data-aos="fade-up"
            className="sm:w-1/2 w-full rounded bg-white relative py-[40px] px-[38px]"
            style={{ zIndex: "999" }}
          >
            <div className="title-bar flex items-center justify-between mb-3">
              <h1 className="text-2xl font-medium text-qblack mb-5">
                {langCntnt && langCntnt.Write_Your_Reviews}
              </h1>
              <span
                className="cursor-pointer"
                onClick={() => setReviewModal(!reviewModal)}
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                    fill="#F34336"
                  />
                </svg>
              </span>
            </div>

            <div className="write-review w-full">
              <div className="flex space-x-1 items-center mb-[30px]">
                <StarRating
                  hoverRating={hover}
                  hoverHandler={setHover}
                  rating={rating}
                  ratingHandler={setRating}
                />
                <span className="text-qblack text-[15px] font-normal mt-1">
                  ({rating}.0)
                </span>
              </div>

              <div className="w-full review-form ">
                <div className=" w-full mb-[30px]">
                  <InputCom
                    label="name"
                    placeholder=""
                    type="text"
                    name="name"
                    inputClasses="h-[50px]"
                    value={name}
                    inputHandler={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full mb-[30px]">
                  <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
                    {langCntnt && langCntnt.Message}*
                  </h6>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    className="w-full placeholder:text-sm focus:ring-0 rounded border border-qpurplelow focus:outline-none p-6"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={reviewAction}
                    type="button"
                    className="bg-qpurple rounded text-white w-[300px] h-[50px]  flex justify-center"
                  >
                    <span className="flex space-x-1 items-center h-full">
                      <span className="text-sm font-semibold">
                        {langCntnt && langCntnt.Submit_Review}
                      </span>
                      {reviewLoading && (
                        <span
                          className="w-5 "
                          style={{ transform: "scale(0.3)" }}
                        >
                          <LoaderStyleOne />
                        </span>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default isAuth(OrderCom);
