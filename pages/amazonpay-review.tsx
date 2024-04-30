import CartDetailItem from "@/website/components/CartDetailItem/CartDetailItem";
import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { getAmazonPaymentDetails } from "@/website/lib/networkCalls/paymentFunction";
import {
  AmazonPayReveiwProps,
  AmazonProps,
} from "@/website/lib/types/teetagTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "store/store";

const AmazonPayReview = () => {
  const router = useRouter();
  const billing = useSelector((state: RootState) => state.auth.billing);
  const shipping = useSelector((state: RootState) => state.auth.shipping);
  const cart = useSelector((state: RootState) => state.auth.cart);
  const [amazonPay, setAmazonPay] = useState<AmazonProps>(null);
  const [session, setSession] = useState<AmazonPayReveiwProps | null>(null);
  const { amazonCheckoutSessionId } = router.query;

  const _window = window as any;
  const amazonApi = _window?.amazon?.Pay;

  if (amazonApi) {
    // set only if amazon pay is not set
    if (!amazonPay) {
      setAmazonPay({ ...amazonApi });
    }
  }

  useEffect(() => {
    const renderPaymentButton = async (): Promise<void> => {
      amazonPay.bindChangeAction("#changeButton2", {
        amazonCheckoutSessionId: amazonCheckoutSessionId,
        changeAction: "changePayment",
      });
    };
    if (router.isReady) {
      renderPaymentButton();
    }
    /** amazonButtonConfig is an object having signature and payload */
  }, [amazonPay, amazonCheckoutSessionId, router]);

  useEffect(() => {
    const getSessionDetails = async () => {
      const response = await getAmazonPaymentDetails({
        billing: billing,
        shipping: shipping,
        cart_id: cart.id,
        user_id: cart.user_id,
        amazonCheckoutSessionId: String(amazonCheckoutSessionId),
        total: cart.total,
      });
      if (response.status === 200) {
        setSession(response.result.session);
      }
    };
    if (router.isReady) {
      getSessionDetails();
    }
  }, [router, amazonCheckoutSessionId]);
  return (
    <>
      <Header />
      <PageHeader title="" />
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
                Review Order
              </h3>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-fugaz h8 text-green-light">
                    Current Selection
                  </p>
                  <p className="text-xl">{session?.paymentPreferences}</p>
                </div>
                <div
                  id="changeButton2"
                  className="cursor-pointer underline text-yellow-primary"
                >
                  Change Payment Method
                </div>
              </div>
              <Link
                href={String(session?.webCheckoutDetails?.amazonPayRedirectUrl)}
                className="btn-teetag yellow"
              >
                Order Now
              </Link>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="p-16 teetag-shadow">
                <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
                  Cart Details
                </h3>
                {cart.cartItems?.map((cart) => (
                  <CartDetailItem key={uuid()} cart={cart} />
                ))}
                <div className="total__separator"></div>
                <div className="flex items-center justify-between mt-8 ">
                  <p className="text-xl uppercase font-fugaz text-green-light">
                    total
                  </p>
                  <p className="text-xl uppercase font-fugaz text-green-light">
                    ${cart.total.toFixed(2).replace(/\.00$/, "")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AmazonPayReview;
