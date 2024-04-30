import { Category, ProductType } from "@/website/lib/types/wooCommerceTypes";
import { Dispatch, SetStateAction } from "react";
import styles from "./SortBox.module.css";

interface SortBoxPropsOne {
  type: "category";
  categories: Category[];
  setSearchResult: Dispatch<SetStateAction<Category[]>>;
}

interface SortBoxPropsTwo {
  type: "product";
  products: ProductType[];
  setSearchResult: Dispatch<SetStateAction<ProductType[]>>;
}

type SortBoxProps = SortBoxPropsOne | SortBoxPropsTwo;

const SortBox = (props: SortBoxProps) => {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (props.type === "category") {
      let sortedArray: Category[] = [];
      switch (e.target.value) {
        case "asc":
          sortedArray = [...props.categories].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
          );
          break;
        case "desc":
          sortedArray = [...props.categories].sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
          );
          break;
        default:
          return props.categories;
      }
      props.setSearchResult(sortedArray);
    } else {
      let sortedArray: ProductType[] = [];
      switch (e.target.value) {
        case "asc":
          sortedArray = [...props.products].sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
          );
          break;
        case "desc":
          sortedArray = [...props.products].sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
          );
          break;
        default:
          return props.products;
      }
      props.setSearchResult(sortedArray);
    }
  }
  return (
    <form className={styles.sortbox} onSubmit={handleSubmit}>
      <p className="text-lg">Sort By</p>

      <select onChange={handleChange}>
        <option value="">None</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
    </form>
  );
};

export default SortBox;
