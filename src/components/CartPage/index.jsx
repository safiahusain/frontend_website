import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../utils/auth";
import apiRequest from "../../../utils/apiRequest";
import { toast } from "react-toastify";
import { fetchCart } from "../../store/Cart";
import Link from "next/link";
import isAuth from "../../../Middleware/isAuth";
import languageModel from "../../../utils/languageModel";

function CardPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [getCarts, setGetCarts] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);
  const deleteItem = (id) => {
    if (auth()) {
      apiRequest
        .deleteCartItem({
          id: id,
          token: auth().access_token,
        })
        .then((res) => {
          toast.warn("Remove from Cart", {
            autoClose: 1000,
          });
          dispatch(fetchCart());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (cart && cart.cartProducts.length > 0) {
      const cartsItems = cart.cartProducts.map((item) => {
        return {
          ...item,
          totalPrice: item.product.offer_price
            ? item.product.offer_price * parseInt(item.qty)
            : item.product.price * parseInt(item.qty),
        };
      });
      setGetCarts(cartsItems);
    } else {
      setGetCarts([]);
    }
  }, [cart]);
  const calCPriceDependQunatity = (id, qyt) => {
    setGetCarts(
      getCarts &&
        getCarts.length > 0 &&
        getCarts.map((cart) => {
          if (cart.id === id) {
            return {
              ...cart,
              totalPrice: cart.product.offer_price
                ? cart.product.offer_price * qyt
                : cart.product.price * qyt,
            };
          }
          return cart;
        })
    );
  };
  const serverReqIncreseQty = (id) => {
    if (auth()) {
      apiRequest.incrementQyt(id, auth().access_token);
      dispatch(fetchCart());
    }
  };
  const serverReqDecreseQyt = (id) => {
    if (auth()) {
      apiRequest.decrementQyt(id, auth().access_token);
      dispatch(fetchCart());
    }
  };
  const clearCart = async () => {
    if (auth()) {
      setGetCarts([]);
      await apiRequest.clearCart({
        token: auth().access_token,
      });
      dispatch(fetchCart());
    } else {
      return false;
    }
  };

  return (
    <>
      {getCarts && getCarts.length === 0 ? (
        <div className="cart-page-wrapper w-full pt-[60px] pb-[114px]">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white  pb-[114px]">
          <div className="w-full">
            <PageTitle
              title={langCntnt && langCntnt.Your_cart}
              breadcrumb={[
                { name: langCntnt && langCntnt.home, path: "/" },
                { name: langCntnt && langCntnt.cart, path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full pt-[60px]">
            <div className="container-x mx-auto">
              <ProductsTable
                calCPriceDependQunatity={calCPriceDependQunatity}
                incrementQty={serverReqIncreseQty}
                decrementQty={serverReqDecreseQyt}
                deleteItem={deleteItem}
                cartItems={getCarts && getCarts}
                className="mb-[30px]"
              />
              <div className="w-full sm:flex justify-between">
                <div className="flex space-x-4 items-center">
                  <button onClick={clearCart} type="button">
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      {langCntnt && langCntnt.Clear_Cart}
                    </div>
                  </button>
                  <Link href="/cart">
                    <div className="w-[140px] md:flex hidden rounded-full h-[50px] bg-[#F6F6F6] flex justify-center items-center cursor-pointer">
                      <span className="text-sm font-semibold">
                        {langCntnt && langCntnt.Update_Cart}
                      </span>
                    </div>
                  </Link>
                  <Link href="/checkout">
                    <div className="md:w-[300px]  w-1/2  h-[50px]  flex justify-center items-center cursor-pointer">
                      <div className=" transition-common bg-qpurple hover:bg-qpurplelow/10 border border-transparent hover:border-qpurple hover:text-qpurple text-white flex justify-center items-center w-full h-full rounded-full">
                        <span className="text-sm font-semibold">
                          {langCntnt && langCntnt.Proceed_to_Checkout}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default isAuth(CardPage);
