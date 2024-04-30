import Image from "next/image";
import styles from "./Product.module.css";

import { Category, ProductType } from "@/website/lib/types/wooCommerceTypes";
import Link from "next/link";
import { useRouter } from "next/router";

interface ProductProps {
  product: ProductType;
  category?: Category;
}
export const Product = ({ product, category }: ProductProps) => {
  const router = useRouter();
  const { asPath } = router;
  const parts = asPath.split("/");
  const url = parts[2] || "";
  return (
    <div className={styles.productbox}>
      <Link
        href={`/states${
          category ? `/${category?.id}` : `/${url}`
        }/${encodeURIComponent(product?.id)}`}
        className={styles.product_thumb}
      >
        <Image
          src={
            product.images[0]?.src
              ? product.images[0]?.src
              : "/assets/placeholder-large.png"
          }
          blurDataURL="/assets/placeholder-large.png"
          placeholder="blur"
          width={380}
          height={340}
          alt={product.images[0]?.alt}
        />
      </Link>
      <div className={styles.product_detail}>
        <h6 className="text-xl font-bold uppercase">{product.name}</h6>
        <h4 className="h6 text-green-light font-fugaz mt-2">
          ${parseFloat(product.price).toFixed(2).replace(/\.00$/, "")}
        </h4>
      </div>
    </div>
  );
};
