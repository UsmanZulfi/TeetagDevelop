import Heading from "@/website/components/Heading/Heading";
import { Product } from "@/website/components/Product/Product";
import { ProductType } from "@/website/lib/types/wooCommerceTypes";

interface RelatedProductsProps {
  relatedProducts: ProductType[];
}

const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  return relatedProducts?.length ? (
    <>
      <section className="section">
        <div className="container">
          <Heading title="More popular Tees" />
          <div className="grid grid-cols-2 gap-10 mt-24 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  ) : (
    <div className="py-20"></div>
  );
};

export default RelatedProducts;
