import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { useRenderAmazonPayButton } from "@/website/lib/hooks/AmazonPayButton";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBilling } from "store/features/auth/authSlice";
import { RootState } from "store/store";

const AmazonPayContributionConfirm = () => {
  const billing = useSelector((state: RootState) => state.auth.billing);
  const dispatch = useDispatch();
  const router = useRouter();
  useRenderAmazonPayButton();
  useEffect(() => {
    if (router.isReady) {
      if (!billing) {
        router.replace("/contribution-checkout");
      }
    }
  }, [billing, router]);

  const handleCancel = () => {
    dispatch(updateBilling(null));
    router.replace("/contribution-checkout");
  };
  return billing ? (
    <>
      <Header />
      <PageHeader title="Confirm Billing" />
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-24 xl:grid-cols-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
                Billing address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12">
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    Name
                  </h5>
                  <p className="font-bold h6 text-green-light">
                    {billing?.name}
                  </p>
                </div>
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    Email
                  </h5>
                  <p className="font-bold h6 text-green-light">
                    {billing?.email}
                  </p>
                </div>
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    Phone
                  </h5>
                  <p className="font-bold h6 text-green-light">
                    {billing?.phone}
                  </p>
                </div>
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    City
                  </h5>
                  <p className="font-bold h6 text-green-light">
                    {billing?.city}
                  </p>
                </div>
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    State
                  </h5>
                  <p className="font-bold h6 text-green-light capitalize">
                    {billing?.state}
                  </p>
                </div>
                <div>
                  <h5 className="mb-6 font-semibold h5 text-yellow-primary">
                    Postal Code
                  </h5>
                  <p className="font-bold h6 text-green-light capitalize">
                    {billing?.postal_code}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row items-stretch md:items-start gap-12 mt-16 max-w-screen-sm">
                <div id="AmazonPayButton"></div>
                <button onClick={handleCancel} className="btn-cancel ">
                  Cancel Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default AmazonPayContributionConfirm;
