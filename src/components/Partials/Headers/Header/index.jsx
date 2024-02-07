import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { RiUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import DefaultUser from "../../../../contexts/DefaultUser";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function Header({ drawerAction, settings, contact }) {
  const { cart } = useSelector((state) => state.cart);
  const [cartItems, setCartItem] = useState(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const value = useContext(DefaultUser);

  useEffect(() => {
    setUser(value.user);
  }, [value]);
  useEffect(() => {
    cart && setCartItem(cart.cartProducts);
  }, [cart]);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);
  return (
    <header className="header-section-wrapper relative print:hidden">
      <TopBar contact={contact && contact} className="quomodo-shop-top-bar" />
      <Middlebar
        settings={settings && settings}
        className="quomodo-shop-middle-bar xl:block hidden"
      />
      <div className="quomodo-shop-drawer xl:hidden block w-full h-[60px] bg-white">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <div className="w-[200px] h-full relative">
            <Link href="/" passHref>
              <a>
                {settings && (
                  <Image
                    layout="fill"
                    objectFit="scale-down"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL + settings.logo}`}
                    alt="logo"
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="cart relative cursor-pointer text-qblack">
              <Link href="/cart">
                <span>
                  <BsHandbag size={35} />
                </span>
              </Link>
              <span className="w-[18px] h-[18px] rounded-full text-white bg-qpurple absolute -top-1.5 -right-2 flex justify-center items-center text-[9px]">
                {cartItems ? cartItems.length : 0}
              </span>
            </div>
            <div className="xl:block lg:block md:block sm:block xsm:hidden xxs:hidden xxxs:hidden">
              {auth ? (
                <>
                  {user && (
                    <button type="button">
                      <div className="flex space-x-4 items-center">
                        <div className="w-[40px] h-[40px] rounded-full bg-qyellow relative overflow-hidden">
                          {user && user.image ? (
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + user.image
                              }
                              alt="user"
                            />
                          ) : (
                            <Image
                              layout="fill"
                              objectFit="cover"
                              src={
                                process.env.NEXT_PUBLIC_BASE_URL + defaultImage
                              }
                              alt="user"
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  )}
                </>
              ) : (
                <Link href="/login" passHref>
                  <a rel="noopener noreferrer" title="Login/Register">
                    <span className="cursor-pointer text-[#6E6D79]">
                      <RiUserLine size={35} />
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Navbar className="quomodo-shop-nav-bar lg:block hidden" />
    </header>
  );
}
