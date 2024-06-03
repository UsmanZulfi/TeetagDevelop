import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Order from "@/website/containers/Orders/Order";
import Rules from "@/website/containers/Rules/Rules";
import { StateCollection } from "@/website/containers/StateCollection/StateCollection";
// import { fetchAllCategories } from "@/website/lib/networkCalls/storeFunctions";
import { Category } from "@/website/lib/types/wooCommerceTypes";
// import { GetStaticProps } from "next";
import Head from "next/head";
// import withAuth from "./hoc/withAuth";
import {categoriesData} from './api/Categoris'
interface PlayNowProps {
  categories: Category[];
}

function Play({ categories }: PlayNowProps) {
  return (
    <>
      <Head>
        <title>Play Now | TeeTag</title>
        <meta
          name="description"
          content="America Largest Game of Tag via shirts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Rules rules={rules} />
      <StateCollection categories={categoriesData?.categories} />
      <div className="hidden sm:block" >
        <Order showBanner={false} />
      </div>
      <Footer />
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const categories: Category[] = await fetchAllCategories();

//   if (!categories) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       categories: categories,
//     },
//   };
// };

export default Play;
// export default withAuth(Play)
const rules = [
  {
    num: 1,
    shadowColor: "yellow",
    title: "Select a State",
    text: "Choose the state where the person you want to tag lives",
  },
  {
    num: 2,
    shadowColor: "green",
    title: "Select a Shirt",
    text: "Pick out a shirt that best fits them!",
  },
  {
    num: 3,
    shadowColor: "yellow",
    title: "Send it off!",
    text: "Ship the shirt off to the person you selected to tag",
  },
  {
    num: 4,
    shadowColor: "green",
    title: "Tag! They're it!",
    text: "You have successfully played TeeTag! And the person you tagged is now it!",
  },
];
