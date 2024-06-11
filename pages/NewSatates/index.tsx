import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import ProductDetail from "@/website/containers/ProductDetail/ProductDetail";
import Recipient from "@/website/containers/Recipient/Recipient";
import RelatedProducts from "@/website/containers/RelatedProducts/RelatedProducts";
import {
  fetchProduct,
  fetchRelatedProducts,
} from "@/website/lib/networkCalls/storeFunctions";
import { ProductType } from "@/website/lib/types/wooCommerceTypes";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

interface IParams extends ParsedUrlQuery {
  productid: string;
}

interface ProductProps {
  product: ProductType;
}

const SingleProduct = ({ product }: ProductProps) => {
    const router = useRouter();
  
  const [relatedProducts, setRelatedProducts] = useState<any>(null);

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <>
     
      <Header />
      <Recipient />

      <Footer />
    </>
  );
};

export default SingleProduct;


