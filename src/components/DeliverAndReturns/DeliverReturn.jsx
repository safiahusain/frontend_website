import { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function DeliverReturnsPage({ datas }) {
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const { delivery_returns } = datas;
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              {
                name: "delivery-and-returns",
                path: "/delivery-and-returns",
              },
            ]}
            title={"delivery and returns"}
          />
        </div>
        <div className="w-full pb-[120px]">
          <div
            className="container-x mx-auto content-body"
            dangerouslySetInnerHTML={{
              __html: delivery_returns.delivery_and_returns,
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
