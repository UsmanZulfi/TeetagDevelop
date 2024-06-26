import { Category } from "@/website/lib/types/wooCommerceTypes";
import Image from "next/image";
import Link from "next/link";
import styles from "./State.module.css";
import useWindowWidth from '../UserWindowWidth';
interface StateProps {
  category: Category;
}

import { useState } from "react";
interface StateProps {
  category: Category;
}

export default function State({ category }: StateProps) {
  const [playCategory, setPlayCategory] = useState<Category>(category);
  const windowWidth = useWindowWidth();
 
  const defaultImage = {
    src: "/assets/placeholder.png",
    alt: "placeholder image",
  };
  // Determine the image to use
  const image =
    playCategory?.image && playCategory.image.length > 0
      ? playCategory.image[0]
      : defaultImage;
  return (
   
    <Link
    href={{
      pathname: `/NewSatates`
      // query: { playCategory: JSON.stringify(playCategory) }
    }}
      className={styles.state}
    >
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        blurDataURL="/assets/placeholder.png"
        width={292}
        height={140}
        className="w-120"
      />
      {windowWidth > 767 ? (
        <h4 className="mt-4 text-center uppercase h8 font-fugaz text-yellow-primary">
          {playCategory.name}
        </h4>
      ) :       <h4 className="mt-4 text-center uppercase h8 font-fugaz text-yellow-primary" style={{fontSize:playCategory?.name?.length>9?"2.3rem":22}}>
      {playCategory.name}
    </h4>}
    </Link>
  );
}
