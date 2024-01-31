// import React from "react";
//
// export const getStaticProps = async ({ params }) => {
//   return {
//     props: {
//       product: await getData(params)
//     },
//     revalidate: 60 // ISR
//   }
// }
//
// export const getStaticPaths = async () => {
//   const products = await getTop10Products();
//   const paths = products.map((product) => ({
//     params: {id: product.id}
//   }));
//
//   return {paths, fallback: 'blocking'};
// }
//
// const D3Example = () => {
//   return <div></div>;
// };
//
// export default D3Example;
