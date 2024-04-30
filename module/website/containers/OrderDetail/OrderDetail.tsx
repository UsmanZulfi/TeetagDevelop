import { OrderResponse } from "@/website/lib/types/wooCommerceTypes";
import Link from "next/link";
import CartDetails from "../CartDetails/CartDetails";

interface OrderDetailProps {
  orderDetail: OrderResponse | undefined;
}

const OrderDetail = ({ orderDetail }: OrderDetailProps) => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 gap-24 xl:grid-cols-12">
          <div className="lg:col-span-6 xl:col-span-7">
            <h3 className="mb-16 uppercase h5 font-fugaz text-yellow-primary">
              Your Order has been Received
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Order Number
                </h5>
                <p className="font-bold h8 text-green-light">
                  #{orderDetail?.orderNumber}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Date
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.orderDate}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Email
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.email}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Total
                </h5>
                <p className="font-bold h8 text-green-light">
                  ${orderDetail?.cart.total.toFixed(2).replace(/\.00$/, "")}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Sales Tax
                </h5>
                <p className="font-bold h8 text-green-light">
                  ${orderDetail?.sales_tax}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Payment Method
                </h5>
                <p className="font-bold h8 text-green-light capitalize">
                  {orderDetail?.payment_method}
                </p>
              </div>
            </div>
            <h3 className="my-16 uppercase h5 font-fugaz text-yellow-primary">
              Shipping Detail
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12">
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Name
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.name}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Email
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.email}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Phone
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.phone}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Address
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.address}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  State
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.state}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  Postal Code
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.postal_code}
                </p>
              </div>
              <div>
                <h5 className="mb-6 font-semibold h7 text-yellow-primary">
                  City
                </h5>
                <p className="font-bold h8 text-green-light">
                  {orderDetail?.shipping.city}
                </p>
              </div>
            </div>
            <Link href="/play-now" className="btn-teetag yellow">
              Play Again
            </Link>
          </div>
          <div className="lg:col-span-6 xl:col-span-5">
            <CartDetails orderDetail={orderDetail} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
