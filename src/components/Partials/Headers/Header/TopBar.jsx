import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import languageModel from "../../../../../utils/languageModel";
import { GetAllCurrencies } from "../../../../store/Currencies";
export default function TopBar({ className, contact }) {
  const dispatch = useDispatch();
  const { Currencies } = useSelector((state) => state.Currencies);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const googleDivRef = useRef(null);
  const [auth, setAuth] = useState(null);
  const [langCntnt, setLangCntnt] = useState(null);
  const { isFallback, events } = useRouter();
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
    setLangCntnt(languageModel());
  }, []);

  const savedSelectedOption =
    JSON.parse(localStorage.getItem("selectedCode")) || null;

  const [selectedOption, setSelectedOption] = useState(savedSelectedOption);

  useEffect(() => {
    dispatch(GetAllCurrencies());
  }, []);

  const handleCurrencychange = (e) => {
    let filterCurrencies;
    if (e.target.value) {
      filterCurrencies = Currencies.filter((item) =>
        item.rate == e.target.value ? item : ""
      );
      setSelectedOption(e.target.value);
      localStorage.setItem("selectedCode", JSON.stringify(e.target.value));
      localStorage.setItem(
        "selectedRate",
        JSON.stringify(
          e.target.value == "default-Currency" ? 0 : filterCurrencies[0]
        )
      );
      window.location.reload();
    }
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
    const googleDiv = googleDivRef.current;
    if (googleDiv) {
      const googleDivChild = googleDiv.querySelector(".skiptranslate div");
      if (googleDivChild) {
        googleDivChild.nextElementSibling.remove();
      }

      Array.from(googleDiv.childNodes).forEach((child) => {
        if (child.nodeType === 3 && child.nodeValue.trim() !== "") {
          googleDiv.removeChild(child);
        }
      });
    }
  };

  useEffect(() => {
    const id = "google-translate-script";

    const addScript = () => {
      const s = document.createElement("script");
      s.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      s.setAttribute("id", id);
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const q = document.getElementById(id);
      if (q) q.remove();
      const w = document.getElementById("google_translate_element");
      if (w) w.innerHTML = "";
    };

    isFallback || addScript();

    events.on("routeChangeStart", removeScript);
    events.on("routeChangeComplete", addScript);

    return () => {
      events.off("routeChangeStart", removeScript);
      events.off("routeChangeComplete", addScript);
    };
  }, []);
  return (
    <>
      <div className={`w-full bg-qpurplelow/10 h-12 ${className || ""}`}>
        <div className="xl:max-w-[1350px] lg:max-w-[1190px] md:max-w-[1190px] mx-auto h-full">
          <div className="flex justify-between items-center h-full xl:px-0 lg:px-4 md:px-4 sm:px-4 xsm:px-4 xxs:px-4 xxxs:px-4">
            <div className="topbar-nav">
              <ul className="flex space-x-6 items-center">
                <li>
                  <Link href="/sellers" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <SlLocationPin size={20} />
                      <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                        {"Find a Store"}
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  {auth ? (
                    <Link href="/profile#dashboard" passHref>
                      <a rel="noopener noreferrer">
                        <span className="text-sm leading-6 text-qblack font-500 cursor-pointer">
                          {langCntnt && langCntnt.Account}
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/login" passHref>
                      <a rel="noopener noreferrer">
                        <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                          {langCntnt && langCntnt.Account}
                        </span>
                      </a>
                    </Link>
                  )}
                </li>
                <li className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <Link href="/tracking-order" passHref>
                    <a rel="noopener noreferrer">
                      <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                        {langCntnt && langCntnt.Track_Order}
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <Link href="/faq" passHref>
                    <a rel="noopener noreferrer">
                      <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                        {langCntnt && langCntnt.Support}
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topbar-nav-2 flex">
              <ul className="flex items-center">
                {/* <li className="border-r-2 border-black pr-3 xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <Link href="/sellers" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                        {langCntnt && langCntnt.Sellers}
                      </span>
                    </a>
                  </Link>
                </li> */}
                <li className="pl-3 border-r-2 border-black pr-3 xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <Link href="/blogs" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="text-[13px] font-[400] leading-6 text-qblack font-500 cursor-pointer">
                        {"Blogs"}
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="pl-3 border-r-2 border-black pr-3 xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <Link href="/contact" passHref>
                    <a
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span className="text-[13px] font-[400]leading-6 text-qblack font-500 cursor-pointer">
                        {"Contact Us"}
                      </span>
                    </a>
                  </Link>
                </li>
                <li className="pl-3 border-r-2 border-black pr-3">
                  <select
                    className={`!block bg-transparent text-[13px] font-[500] cursor-pointer focus:outline-none focus-visible:outline-none`}
                    value={selectedOption}
                    onChange={handleCurrencychange}
                    style={{ textDecoration: "underline" }}
                  >
                    <option value="default-Currency" selected>
                      {websiteSetup.payload.setting.currency_icon}
                    </option>
                    {Currencies &&
                      Currencies.map((option, index) => (
                        <option key={index} value={(option.code, option.rate)}>
                          <span>{option.code}</span>
                        </option>
                      ))}
                  </select>
                </li>
                <li className="pl-3 xl:block lg:block md:block sm:hidden xsm:hidden xxs:hidden xxxs:hidden">
                  <div className="h-[30px]">
                    <div id="google_translate_element" ref={googleDivRef}></div>
                  </div>
                </li>
              </ul>
            </div>
            {/* <div className="topbar-dropdowns sm:block hidden">
              <a href={`tel:${contact && contact.phone}`}>
                <div className="flex space-x-2 items-center">
                  <span className="text-qblack text-sm font-medium">
                    {langCntnt && langCntnt.Need_help}
                  </span>
                  <span className="text-xs text-qpurple font-bold leading-none">
                    {contact && contact.phone}
                  </span>
                </div>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
