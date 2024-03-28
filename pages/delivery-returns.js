import React from "react";
import DeliverReturns from "../src/components/DeliverAndReturns/DeliverReturn";
import PageHead from "../src/components/Helpers/PageHead";

export default function securityPaymentPage({ data }) {
  return (
    <>
      <PageHead title="Delivery and Returns" />
      <DeliverReturns datas={data} />
    </>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/delivery-and-returns`
  );
  const data = await res.json();
  return { props: { data } };
}
