import React from "react";
import PageHead from "../src/components/Helpers/PageHead";
import SecurityPayments from "../src/components/SecurtyAndPayments/SecurityPayments";

export default function securityPaymentPage({ data }) {
  return (
    <>
      <PageHead title="Security and Payments" />
      <SecurityPayments datas={data} />
    </>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/security-and-payments`
  );
  const data = await res.json();
  return { props: { data } };
}
