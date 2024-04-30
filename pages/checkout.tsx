import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import BillingDetails from "@/website/containers/BillingDetails/BillingDetails";
import { checkVerification } from "@/website/lib/networkCalls/authFunctions";
import { getPaymentDetail } from "@/website/lib/networkCalls/paymentFunction";

import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Checkout = () => {
  const router = useRouter();
  const { transaction_id } = router.query;
  const cartItems = useSelector(
    (state: RootState) => state.auth.cart?.cartItems,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const path = localStorage.getItem("user_path");

  useEffect(() => {
    const getTransaction = async () => {
      const response = await getPaymentDetail(String(transaction_id));
      toast.error(response.message);
    };
    if (router.isReady) {
      if (transaction_id) {
        getTransaction();
      }
    }
  }, [transaction_id, router]);

  useEffect(() => {
    if (!cartItems?.length) {
      router.replace("/cart");
    }
  }, [cartItems]);

  useMemo(() => {
    const Verification = async (): Promise<any> => {
      if (user?.phone === null) {
        router.push("/additional");
      } else {
        checkVerification(String(user?.to_verify), router);
      }
    };

    Verification();
  }, [user]);

  if (path) {
    localStorage.removeItem("user_path");
    router.push(path, undefined, { shallow: true });
  } else {
    return !user?.to_verify ? (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <TitleHead title="checkout" metaTitle="checkout" metaDesc="" />
        <Header />
        <PageHeader title="Checkout" />
        <BillingDetails />
        <Footer />
      </>
    ) : (
      <Loader />
    );
  }
};

export default Checkout;
