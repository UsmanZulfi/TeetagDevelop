import Heading3 from "@/website/components/Heading3/Heading3";
import { ProductList } from "@/website/components/ProductList/ProductList";
import SortBox from "@/website/components/SortBox/SortBox";
import { Category, ProductType } from "@/website/lib/types/wooCommerceTypes";
import { useEffect, useState } from "react";

interface ProductCollectionProps {
  products: ProductType[];
  category?: Category;
}

export const ProductCollection = ({
  products,
  category,
}: ProductCollectionProps) => {
  const [productList, setProductList] = useState<ProductType[]>(products);
  const [searchResult, setSearchResult] = useState<ProductType[]>(products);
  useEffect(() => {
    setProductList(products);
    setSearchResult(products);
  }, [products]);
  return (
    <div className="container pt-12 pb-20">
      <div className="flex flex-col items-start justify-between lg:items-center lg:flex-row">
        <div className="flex flex-row items-center gap-2 mb-10 lg:mb-0 lg:gap-10 lg:flex-row lg:items-center">
          <Heading3 title={category ? category?.name : ""} />
          <p className="h8 text-green-light">({products?.length} Products)</p>
        </div>
        <div className="w-full md:w-auto">
          <SortBox
            type="product"
            products={productList}
            setSearchResult={setSearchResult}
          />
        </div>
      </div>
      <ProductList products={searchResult} category={category} />
    </div>
  );
};
