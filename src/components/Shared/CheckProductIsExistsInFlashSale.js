import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import settings from "../../../utils/settings";

function CheckProductIsExistsInFlashSale({
  id,
  price,
  sign = true,
  className,
}) {
  console.log(price);
  const { websiteSetup } = useSelector((state) => state.websiteSetup);
  const [flashSale, setData] = useState(null);
  const [calPrice, setPrice] = useState(null);
  useEffect(() => {
    if (websiteSetup) {
      setData({
        flashSale: websiteSetup.payload.flashSale,
        flashSaleActive: websiteSetup.payload.flashSaleActive,
        flashSaleProducts: websiteSetup.payload.flashSaleProducts,
      });
    }
  }, [websiteSetup]);
  const calcProductPrice = (id, price) => {
    // console.log(id, price);
    // console.log(flashSale);
    if (flashSale && flashSale.flashSaleActive) {
      const getId = flashSale.flashSaleProducts.find(
        (item) => parseInt(item.product_id) === parseInt(id)
      );
      if (getId) {
        const offer = parseInt(flashSale.flashSale.offer);
        const discountPrice = (offer / 100) * parseFloat(price);
        const mainPrice = parseFloat(price) - discountPrice;
        setPrice(mainPrice);
      } else {
        setPrice(price);
      }
    } else {
      setPrice(price);
    }
  };
  useEffect(() => {
    if (id && price) {
      calcProductPrice(id, price);
    }
  });

  const exchangeRate = JSON.parse(localStorage.getItem("selectedRate")) || 0;
  const convertAmount = (amount, rate) => {
    return amount * rate;
  };

  const { currency_icon } = settings();
  if (sign) {
    if (exchangeRate) {
      return exchangeRate.code
        ? exchangeRate.code +
            parseFloat(convertAmount(calPrice, exchangeRate.rate)).toFixed(2)
        : "$" +
            parseFloat(convertAmount(calPrice, exchangeRate.rate)).toFixed(2);
    } else {
      return currency_icon
        ? currency_icon + parseFloat(calPrice).toFixed(2)
        : "$" + parseFloat(calPrice).toFixed(2);
    }
  } else {
    return parseFloat(convertAmount(calPrice, exchangeRate.rate)).toFixed(2);
  }
}

export default CheckProductIsExistsInFlashSale;

//(27 * 20 /100)-27

//offer =(20/100*price)
//total=price-offer
