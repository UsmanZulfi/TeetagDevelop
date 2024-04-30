import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUser } from "@/website/lib/networkCalls/authFunctions";
import { getPaymentDetail } from "@/website/lib/networkCalls/paymentFunction";
import { User } from "@/website/lib/types/teetagTypes";
import { OrderResponse } from "@/website/lib/types/wooCommerceTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBilling,
  updateShipping,
  updateUser,
} from "store/features/auth/authSlice";
import { RootState } from "store/store";

const ContributionOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const { transaction_id } = router.query;
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();

  useEffect(() => {
    const getTransaction = async () => {
      const response = await getPaymentDetail(String(transaction_id));
      if (response.status === 200) {
        localStorage.removeItem("contribute_price");
        const userResponse = await getUser(token);
        const user: User = userResponse.result.user;
        dispatch(updateUser(user));
        dispatch(updateShipping(null));
        dispatch(updateBilling(null));
        setOrderDetail(response.result);
      }
    };
    if (router.isReady) {
      if (!transaction_id) {
        router.replace("/contribution");
      } else {
        getTransaction();
      }
    }
  }, [transaction_id, router]);

  return orderDetail ? (
    <>
      <TitleHead
        title="Contribution Received"
        metaDesc=""
        metaTitle="Contribution Received"
      />
      <Header />
      <PageHeader title="Thank You!" />
      <section className="section">
        <div className="container">
          <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
            your Contribution has been received
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Order Number
              </h5>
              <p className="font-bold h6 text-green-light">
                #{orderDetail?.orderNumber}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Date
              </h5>
              <p className="font-bold h6 text-green-light">
                {orderDetail?.orderDate}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Customer Name
              </h5>
              <p className="font-bold h6 text-green-light">
                {orderDetail?.name}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Email
              </h5>
              <p className="font-bold h6 text-green-light">
                {orderDetail?.email}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Total
              </h5>
              <p className="font-bold h6 text-green-light">
                $
                {parseFloat(orderDetail?.total ?? "")
                  .toFixed(2)
                  .replace(/\.00$/, "")}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Payment Method
              </h5>
              <p className="font-bold h6 text-green-light capitalize">
                {orderDetail?.payment_method}
              </p>
            </div>
            <div>
              <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                Phone Number
              </h5>
              <p className="font-bold h6 text-green-light">
                {orderDetail?.phone}
              </p>
            </div>
          </div>
          <Link href="/contribution" className="btn-teetag yellow">
            Back to Contribution
          </Link>
        </div>
      </section>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default ContributionOrder;
