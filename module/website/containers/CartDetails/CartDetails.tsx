import CartDetailItem from "@/website/components/CartDetailItem/CartDetailItem";
import PaymentMethod from "@/website/components/PaymentMethod/PaymentMethod";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getDefaultMinionCode,
  validateMinionCode,
} from "@/website/lib/networkCalls/cartFunctions";
import { OrderResponse } from "@/website/lib/types/wooCommerceTypes";
import { ErrorMessage, Field } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "store/store";
import styles from "./CartDetails.module.css";

interface CartDetailsProps {
  orderDetail?: OrderResponse;
  isValid?: boolean;
  setIsValid?: (isValid: boolean) => void;
  response?: any;
  setResponse?: (response: any) => void;
}

const CartDetails = ({
  orderDetail,
  isValid,
  setIsValid,
  setResponse,
}: CartDetailsProps) => {
  const router = useRouter();
  let cart = useSelector((state: RootState) => state.auth.cart);
  const [code, setCode] = useState("");
  const [defaultcode, setdefaultCode] = useState("");
  const [isCodeEdited, setIsCodeEdited] = useState(false);
  // const [response, setResponse] = useState<any>(null);
  const validateCode = async () => {
    event.preventDefault();
    if (code && code !== defaultcode) {
      const response = await validateMinionCode(code);
      response.status === 200
        ? (setResponse(response.result.chain_code), setIsValid(true))
        : setIsValid(false);

      handleStatus(response);
    }
    return;
  };
  useEffect(() => {
    if (code == "" && typeof isValid !== "undefined") {
      setIsValid(true);
    }
  }, [code]);

  useEffect(() => {
    getDefaultMinionCode().then((res) => {
      if (res.status === 200) {
        setdefaultCode(res.result.chain_code?.code || null);
      }
    });
  }, []);

  const couponBox = (
    <div className="flex items-center justify-between">
      <p className="text-xl uppercase font-fugaz">State Ambassador code</p>
      <div className="teetag__input">
        <Field
          type="string"
          name="code"
          id="code"
          placeholder="Enter Code"
          value={isCodeEdited ? code : defaultcode}
          onChange={(e) => {
            setIsCodeEdited(true);
            setCode(e.target.value);
          }}
        />
        {!isValid && (
          <ErrorMessage
            name="code"
            component="p"
            className="label-error mt-6"
          />
        )}
      </div>
    </div>
  );
  if (orderDetail) {
    return (
      <div className="p-16 teetag-shadow">
        <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
          Order Details
        </h3>
        {orderDetail?.cart.cartItems?.map((cart) => (
          <CartDetailItem key={uuid()} cart={cart} />
        ))}
        <div className={styles.cart_total}>
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl uppercase font-fugaz">subtotal</p>
            <p className="text-xl uppercase font-fugaz">
              ${orderDetail?.cart.sub_total.toFixed(2).replace(/\.00$/, "")}
            </p>
          </div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl uppercase font-fugaz">Shipping Fee</p>
            <p className="text-xl uppercase font-fugaz">
              ${orderDetail?.cart.shipping_cost}
            </p>
          </div>

          {router.pathname === "/order-tracking" ? (
            <div className="flex items-center justify-between ">
              <p className="text-xl uppercase font-fugaz">Payment Method</p>
              <p className="text-xl uppercase font-fugaz">
                {orderDetail?.payment_method}
              </p>
            </div>
          ) : (
            <>
              {couponBox}{" "}
              <div className="flex justify-end">
                <button
                  className="btn-teetag yellow"
                  onClick={validateCode}
                  disabled={code == "" || code == defaultcode}
                >
                  Apply Code
                </button>
              </div>
            </>
          )}
        </div>
        <p className="mt-5 text-base">
          Sales Tax will be calculated when you place your order.
        </p>
        <div className="flex items-center justify-between mt-8">
          <p className="text-xl uppercase font-fugaz text-green-light">total</p>
          <p className="text-xl uppercase font-fugaz text-green-light">
            ${orderDetail?.total}
          </p>
        </div>
        {router.pathname === "/order-tracking" ? <></> : <PaymentMethod />}
      </div>
    );
  } else {
    return (
      <div className="p-16 teetag-shadow">
        <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
          Order Details
        </h3>
        {cart?.cartItems?.map((cart) => (
          <CartDetailItem key={uuid()} cart={cart} />
        ))}
        <div className={styles.cart_total}>
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl uppercase font-fugaz">subtotal</p>
            <p className="text-xl uppercase font-fugaz">
              ${cart?.sub_total.toFixed(2).replace(/\.00$/, "")}
            </p>
          </div>
          <div className="flex items-center justify-between mb-8">
            <p className="text-xl uppercase font-fugaz">Shipping Fee</p>
            <p className="text-xl uppercase font-fugaz">
              ${cart.shipping_cost}
            </p>
          </div>

          {router.pathname === "/order-tracking" ? (
            <div className="flex items-center justify-between ">
              <p className="text-xl uppercase font-fugaz">Payment Method</p>
              <p className="text-xl uppercase font-fugaz">Paypal</p>
            </div>
          ) : (
            <>
              {couponBox}{" "}
              <div className="flex justify-end">
                <button
                  className="btn-teetag yellow"
                  onClick={validateCode}
                  disabled={code == "" || code == defaultcode}
                >
                  Apply Code
                </button>
              </div>
            </>
          )}
        </div>
        <p className="mt-5 text-base">
          Sales Tax will be calculated when you place your order.
        </p>
        <div className="flex items-center justify-between mt-8">
          <p className="text-xl uppercase font-fugaz text-green-light">total</p>
          <p className="text-xl uppercase font-fugaz text-green-light">
            ${cart?.total.toFixed(2).replace(/\.00$/, "")}
          </p>
        </div>
        {router.pathname === "/order-tracking" ? <></> : <PaymentMethod />}
      </div>
    );
  }
};

export default CartDetails;
