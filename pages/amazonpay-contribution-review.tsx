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
import { RootState } from "store/store";

const AmazonPayContributionReview = () => {
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
        shipping: null,
        cart_id: null,
        user_id: cart.user_id,
        amazonCheckoutSessionId: String(amazonCheckoutSessionId),
        total: JSON.parse(localStorage.getItem("contribute_price")),
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
            <div className="lg:col-span-6 xl:col-span-6">
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
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AmazonPayContributionReview;
