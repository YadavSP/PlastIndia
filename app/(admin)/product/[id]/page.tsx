// pages/product/[id].js

import { useRouter } from 'next/router';
import Image from 'next/image';
//import { products } from '../../home/products'; // Adjust the path based on where your products data is stored.

export default function ProductDetails() {
  const router = useRouter();

  
}

// Fetch all paths for products
// export async function getStaticPaths() {
//   const paths = products.map((product) => ({
//     params: { id: product.id.toString() },
//   }));

//   return { paths, fallback: false }; // `false` means 404 for non-existent pages
// }

// Fetch product data based on ID
// export async function getStaticProps({ params }) {
//   const product = products.find((p) => p.id.toString() === params.id);
//   return { props: { product } };
// }
