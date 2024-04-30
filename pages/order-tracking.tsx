import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import OrderDetail from "@/website/containers/OrderDetail/OrderDetail";
import { getUser } from "@/website/lib/networkCalls/authFunctions";
import { getPaymentDetail } from "@/website/lib/networkCalls/paymentFunction";
import { User } from "@/website/lib/types/teetagTypes";
import { OrderResponse } from "@/website/lib/types/wooCommerceTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBilling,
  updateCart,
  updateShipping,
  updateUser,
} from "store/features/auth/authSlice";
import { RootState } from "store/store";

const OrderTracking = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { transaction_id } = router.query;
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();

  useEffect(() => {
    const getTransaction = async () => {
      const response = await getPaymentDetail(String(transaction_id));
      if (response.status === 200) {
        const userResponse = await getUser(token);
        const user: User = userResponse.result.user;
        dispatch(updateUser(user));
        dispatch(updateCart(user.cart));
        dispatch(updateShipping(null));
        dispatch(updateBilling(null));
        setOrderDetail(response.result);
      }
    };
    if (router.isReady) {
      if (!transaction_id) {
        router.replace("/checkout");
      } else {
        getTransaction();
      }
    }
  }, [transaction_id, router]);

  return orderDetail ? (
    <>
      <TitleHead
        title="Order Completed"
        metaTitle="order tracking"
        metaDesc=""
      />
      <Header />
      <PageHeader title="Thank you!" />
      <OrderDetail orderDetail={orderDetail} />
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default OrderTracking;
