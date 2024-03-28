import { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function SecurityPayments({ datas }) {
  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const { security_payments } = datas;
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="terms-condition-page w-full bg-white pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: langCntnt && langCntnt.home, path: "/" },
              {
                name: "security-and-payments",
                path: "/security-and-payments",
              },
            ]}
            title={"Security and Payments"}
          />
        </div>
        <div className="w-full pb-[120px]">
          <div
            className="container-x mx-auto content-body"
            dangerouslySetInnerHTML={{
              __html: security_payments.security_and_payments,
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
