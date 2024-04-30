import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ProductCollection } from "@/website/containers/ProductCollection/ProductCollection";
import { Category, ProductType } from "@/website/lib/types/wooCommerceTypes";
import Image from "next/image";

import { LoadMore } from "@/website/components/LoadMore/LoadMore";
import { fetchCategory } from "@/website/lib/networkCalls/storeFunctions";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import styles from "./states.module.css";

interface CollectionPageProps {
  products: ProductType[];
  category: Category;
}

interface IParams extends ParsedUrlQuery {
  stateslug: string;
}

export default function CollectionPage({ category }: CollectionPageProps) {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleDataChange = (data: ProductType[]) => {
    setProducts([...products, ...data]);
    setIsLoading(false);
  };

  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title={category.name}
            metaDesc=""
            metaTitle={category.name}
          />
          <section className={styles.cat__hero}>
            <Header />
            <div className="container">
              <div className={styles.cat__hero_content}>
                <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
                  {category?.name}
                </h1>
                <div className="flex items-center justify-center gap-6 mt-6 lg:gap-10 ">
                  <Image
                    src={category.image[0].src}
                    alt="collection"
                    width={230}
                    height={110}
                  />
                  <Image
                    src={category.image[1]?.src || category.image[0].src}
                    alt="collection"
                    width={230}
                    height={110}
                  />
                  <Image
                    src={category.image[2]?.src || category.image[0].src}
                    alt="collection"
                    width={230}
                    height={110}
                    className="hidden sm:block"
                  />
                </div>
              </div>
            </div>
          </section>
          <ProductCollection products={products} category={category} />
        </>
      )}
      <LoadMore
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/store/products?category=${category.id}&per_page=12`}
        parameter="products"
        categoryId={category.id}
      ></LoadMore>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { stateslug } = ctx.params as IParams;
  try {
    const category: Category = await fetchCategory(stateslug);
    return {
      props: {
        category,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
