import CartDetailItem from "@/website/components/CartDetailItem/CartDetailItem";
import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { useRenderAmazonPayButton } from "@/website/lib/hooks/AmazonPayButton";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { updateBilling, updateShipping } from "store/features/auth/authSlice";
import { RootState } from "store/store";

const AmazonPayConfirm = () => {
  const billing = useSelector((state: RootState) => state.auth.billing);
  const shipping = useSelector((state: RootState) => state.auth.shipping);
  const cart = useSelector((state: RootState) => state.auth.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  useRenderAmazonPayButton();
  useEffect(() => {
    if (router.isReady) {
      if (!billing) {
        router.replace("/checkout");
      }
    }
  }, [billing, router]);
  const handleCancel = () => {
    dispatch(updateBilling(null));
    dispatch(updateShipping(null));
    router.replace("/checkout");
  };
  return billing ? (
    <>
      <Header />
      <TitleHead
        title="Confirm Billing Info"
        metaTitle="confirm billing info"
        metaDesc=""
      />
      <PageHeader title="Confirm Billing Info" />
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-24 xl:grid-cols-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <h3 className="mb-16 uppercase h5 font-fugaz text-yellow-primary">
                Billing address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12">
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    Name
                  </h6>
                  <p className="font-bold h8  text-green-light">
                    {billing?.name}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    Email
                  </h6>
                  <p className="font-bold h8  text-green-light">
                    {billing?.email}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    Phone
                  </h6>
                  <p className="font-bold h8  text-green-light">
                    {billing?.phone}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    City
                  </h6>
                  <p className="font-bold h8  text-green-light">
                    {billing?.city}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    State
                  </h6>
                  <p className="font-bold h8  text-green-light capitalize">
                    {billing?.state}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    Postal Code
                  </h6>
                  <p className="font-bold h8  text-green-light capitalize">
                    {billing?.postal_code}
                  </p>
                </div>
                <div>
                  <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                    Address
                  </h6>
                  <p className="font-bold h8  text-green-light capitalize">
                    {billing?.address}
                  </p>
                </div>
              </div>
              {shipping && (
                <>
                  <h3 className="my-16 uppercase h5 font-fugaz text-yellow-primary">
                    Shipping address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12">
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        Name
                      </h6>
                      <p className="font-bold h8  text-green-light">
                        {shipping?.name}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        Email
                      </h6>
                      <p className="font-bold h8  text-green-light">
                        {shipping?.email}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        Phone
                      </h6>
                      <p className="font-bold h8  text-green-light">
                        {shipping?.phone}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        City
                      </h6>
                      <p className="font-bold h8  text-green-light">
                        {shipping?.city}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        State
                      </h6>
                      <p className="font-bold h8  text-green-light capitalize">
                        {shipping?.state}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        Postal Code
                      </h6>
                      <p className="font-bold h8  text-green-light capitalize">
                        {shipping?.postal_code}
                      </p>
                    </div>
                    <div>
                      <h6 className="mb-6 font-semibold h7 text-yellow-primary">
                        Address
                      </h6>
                      <p className="font-bold h8  text-green-light capitalize">
                        {shipping?.address}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col-reverse md:flex-row items-stretch md:items-start gap-12 mt-16 max-w-screen-sm">
                <div id="AmazonPayButton"></div>
                <button onClick={handleCancel} className="btn-cancel ">
                  Cancel Payment
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="p-16 teetag-shadow">
                <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
                  Order Details
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
  ) : (
    <Loader />
  );
};

export default AmazonPayConfirm;
