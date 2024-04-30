import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import Heading from "@/website/components/Heading/Heading";
import OrderForm from "@/website/components/OrderForm/OrderForm";
import Rule from "@/website/components/Rule/Rule";
import Head from "next/head";
import Image from "next/image";

const BulkOrder = () => {
  return (
    <>
      <Head>
        <title>Create Bulk Order</title>
        <meta
          name="description"
          content="America Largest Game of Tag via shirts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <section className="section">
        <div className="container">
          <h1 className="text-center uppercase h1 shadow-heading font-fugaz">
            create bulk order
          </h1>
          <p className="max-w-screen-xl mx-auto text-center h8">
            TeeTag offers a bulk order of t-shirts option to cater to you and
            what you need. We can do custom plate designs for specifically what
            you need. TeeTag has done many bulk orders for a variety of
            different groups such as Clubs, Local Groups, Non-Profits, Greek
            Life, Organizations, Sports Teams, Events, Schools, and more!
          </p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-28 lg:gap-x-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-36">
            <Rule
              num={1}
              shadowColor="yellow"
              title="Customizable"
              text="Shirt Design, State, Color, & Size you want"
            />
            <Rule
              num={2}
              shadowColor="green"
              title="Bella Canvas Shirts"
              text="Comfy & Soft"
            />
            <Rule
              num={3}
              shadowColor="yellow"
              title="Affordable"
              text="$20/shirt + One-time shipping fee"
            />
            <Rule
              title="Quick Shipping"
              num={4}
              shadowColor="green"
              text="10 days or less"
            />
          </div>
        </div>
      </section>
      <OrderForm />
      <section className="section">
        <div className="container">
          <Heading title="Recent Bulk Orders" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-start gap-10 text-center">
              <div className="image-container">
                <Image
                  src="/assets/picture1.png"
                  fill
                  alt=""
                  className="teetag-image-shadow"
                />
              </div>
              <h5 className="uppercase h5 font-fugaz text-green-light">
                charity organization
              </h5>
            </div>
            <div className="flex flex-col items-center justify-start gap-10 text-center">
              <div className="image-container">
                <Image
                  src="/assets/picture2.png"
                  fill
                  alt=""
                  className="teetag-image-shadow"
                />
              </div>
              <h5 className="uppercase h5 font-fugaz text-green-light">
                teachers
              </h5>
            </div>
            <div className="flex flex-col items-center justify-start gap-10 text-center">
              <div className="image-container">
                <Image
                  src="/assets/picture3.png"
                  fill
                  alt=""
                  className="teetag-image-shadow"
                />
              </div>
              <h5 className="uppercase h5 font-fugaz text-green-light">
                school spirit
              </h5>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BulkOrder;
