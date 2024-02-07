import { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function FindStore({ aboutData }) {
  //   const hww = [
  //     {
  //       id: Math.random(),
  //       title: aboutData.aboutUs.title_one,
  //       description: aboutData.aboutUs.description_one,
  //       icon: aboutData.aboutUs.icon_one,
  //     },
  //     {
  //       id: Math.random(),
  //       title: aboutData.aboutUs.title_two,
  //       description: aboutData.aboutUs.description_two,
  //       icon: aboutData.aboutUs.icon_two,
  //     },
  //     {
  //       id: Math.random(),
  //       title: aboutData.aboutUs.title_three,
  //       description: aboutData.aboutUs.description_three,
  //       icon: aboutData.aboutUs.icon_three,
  //     },
  //   ];

  const [langCntnt, setLangCntnt] = useState(null);
  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          <PageTitle
            title={
              <div>
                <h1 className="font-700">
                  {langCntnt && "BYNUNA GUN CENTRE FIND US"}
                </h1>
              </div>
            }
            breadcrumb={[
              { name: `${langCntnt && langCntnt.home}`, path: "/" },
              {
                name: `${langCntnt && "Find Us"}`,
                path: "/findstore",
              },
            ]}
          />

          <div className="findStore-wrapper w-full py-10 bg-white">
            <div className="container-x mx-auto">
              <div className="w-full min-h-[665px] pb-10">
                <h2 className="block text-center text-2xl font-300 uppercase mb-10">
                  FIND YOUR NEAREST BYNUNA STORE!
                </h2>
                <div className="store-box">
                  <div className="box-warapper">
                    <div className="flex items-start gap-4 pb-10">
                      <iframe
                        title="newWork"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.1106014634784!2d74.4172961!3d31.493643599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f0e874a45a1%3A0x26001ce51b7b4be2!2sERSTECH%20SOFTWARE%20COMPANY!5e0!3m2!1sen!2s!4v1707117686058!5m2!1sen!2s"
                        width="290"
                        height="305"
                        style={{ border: "0" }}
                        allowfullscreen=""
                        loading="lazy"
                      ></iframe>
                      <div>
                        <h2 className="text-2xl font-700 text-qblack mb-2">
                          Sportsman Exeter
                        </h2>
                        <p
                          className="block text-[14px] font-400 text-qblack"
                          style={{ lineHeight: "20px" }}
                        >
                          company name
                          <br />
                          19 Apple Lane
                          <br />
                          Trade City
                          <br />
                          Exeter
                          <br />
                          EX2 5GL
                        </p>
                        <a
                          href={`tel:+971 523524928`}
                          className="uppercase font-500 text-qblack text-[14px] mb-2"
                        >
                          t: +971 523524928
                        </a>
                        <br />
                        <a
                          href={`mailto:bilal.fareed54@gmail.com`}
                          className="font-500 text-qblack text-[14px]"
                        >
                          E: info@gmail.com
                        </a>
                        <br />
                        <h2 className="text-2xl font-700 text-qblack mt-2 mb-2">
                          Opening Times:
                        </h2>
                        <p className="block text-[14px] font-400 text-qblack mb-2">
                          9.30am to 5.00pm Monday to Friday
                          <br />
                          9am to 5pm Saturday
                        </p>
                        <p className="block text-[14px] font-400 text-qblack capitalize">
                          closed <b>Bank Holidays</b>
                        </p>
                      </div>
                    </div>
                    <p className="block text-[14px] font-400 text-qblack">
                      In 2007 we were very proud to open our flagship store on
                      the outskirts of Exeter just 1 minute from Junction 30 of
                      the M5. This store is possibly the largest Gun Centre in
                      Europe and is the largest in the UK. Covering an
                      impressive 22,000sq ft our Exeter superstore boasts an awe
                      inspiring 6,000sq ft Showroom. We are confident that you
                      will be amazed at the massive selection we have to offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
