import { Category, ProductType } from "@/website/lib/types/wooCommerceTypes";
import { Product } from "../Product/Product";

interface ProductListProps {
  products: ProductType[];
  category?: Category;
}

export const ProductList = ({ products, category }: ProductListProps) => {
  return (
    <section className="grid grid-cols-2 mt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
      {products?.map((product) => (
        <Product key={product.id} product={product} category={category} />
      ))}
    </section>
  );
};
