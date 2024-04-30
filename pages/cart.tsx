import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import Cart from "@/website/containers/Cart/Cart";
import { Toaster } from "react-hot-toast";

const ShoppingCart = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead title="Cart" metaTitle="cart" metaDesc="" />
      <Header />
      <PageHeader title="MY Cart" />
      <Cart />
      <Footer />
    </>
  );
};

export default ShoppingCart;
