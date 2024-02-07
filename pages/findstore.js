import React from "react";
import FindStore from "../src/components/FindStore";
import PageHead from "../src/components/Helpers/PageHead";
export default function findstore() {
  return (
    <>
      <PageHead title={"findStore"} metaDes={"find a Store"} />
      <FindStore />
    </>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/about-us`);
//   const data = await res.json();
//   return { props: { data } };
// }
