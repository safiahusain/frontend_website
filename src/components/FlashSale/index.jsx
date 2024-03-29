import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import CountDownWidget from "./CountDownWidget";

export default function FlashSale({ fetchData }) {
  const isValidURL = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const parseThumbImage = (thumbImage) => {
    if (isValidURL(thumbImage)) {
      return JSON.parse(thumbImage);
    } else {
      try {
        return JSON.parse(thumbImage);
      } catch {
        return thumbImage;
      }
    }
  };

  const cp =
    fetchData.products &&
    fetchData.products.data.length > 0 &&
    fetchData.products.data.map((item) => {
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
      };
    });
  return (
    <Layout childrenClasses="pb-0 pt-0">
      <div className="flashsale-wrapper w-full">
        <div className="container-x mx-auto pb-[114px] pt-[60px]">
          <div className="w-full">
            <div
              style={{
                backgroundImage: `url(${
                  process.env.NEXT_PUBLIC_BASE_URL +
                  fetchData.flashSale.flashsale_page_image
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              data-aos="fade-right"
              className="flash-ad w-full h-[400px] rounded overflow-hidden flex sm:justify-end justify-center items-center mb-10"
            >
              <CountDownWidget endTime={fetchData.flashSale.end_time} />
            </div>
            <div className="products grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
              <DataIteration datas={cp} startLength={0} endLength={cp.length}>
                {({ datas }) => (
                  <div data-aos="fade-up" key={datas.id} className="item">
                    <ProductCardStyleOne datas={datas} />
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
