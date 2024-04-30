import SortBox from "@/website/components/SortBox/SortBox";
import State from "@/website/components/State/State";
import { Category } from "@/website/lib/types/wooCommerceTypes";
import { useState } from "react";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";

interface StateCollectionProps {
  categories: Category[];
}

export const StateCollection = ({ categories }: StateCollectionProps) => {
  const [categoryList, setCategoryList] = useState<Category[]>(categories);
  const [searchResult, setSearchResult] = useState<Category[]>(categories);

  return (
    <div className="collection__wrapper">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <CategoryFilter
            categories={categoryList}
            setSearchResult={setSearchResult}
          />
          <SortBox
            type="category"
            categories={categoryList}
            setSearchResult={setSearchResult}
          />
        </div>
        <div className="mt-16 collection__body">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResult?.map((category) => (
              <State key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
