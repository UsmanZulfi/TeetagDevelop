import { ErrorMessage, Field } from "formik";
import styles from "./PaymentMethod.module.css";

const PaymentMethod = () => {
  return (
    <>
      <h3 className="mt-16 mb-16 uppercase h4 font-fugaz text-yellow-primary">
        Payment Method
      </h3>
      <div className="grid grid-cols-2 gap-10">
        <div className={styles.teetag__radio}>
          <Field
            type="radio"
            name="paymentMethod"
            id="creditCard"
            value="stripe"
          />
          <label className="uppercase font-fugaz" htmlFor="creditCard">
            credit card
          </label>
        </div>
        <div className={styles.teetag__radio}>
          <Field type="radio" name="paymentMethod" id="paypal" value="paypal" />
          <label className="uppercase font-fugaz" htmlFor="paypal">
            paypal
          </label>
        </div>
        <div className={styles.teetag__radio}>
          <Field type="radio" name="paymentMethod" id="amazon" value="amazon" />
          <label className="uppercase font-fugaz" htmlFor="amazon">
            amazon pay
          </label>
        </div>
      </div>
      <ErrorMessage
        name="paymentMethod"
        component="p"
        className="label-error mt-6"
      />
      <div className="flex items-start justify-start gap-6 mt-16 teetag-checkbox mb-10">
        <Field
          className="flex-shrink-0"
          type="checkbox"
          name="termCheck"
          id="termCheck"
        />

        <label htmlFor="termCheck"></label>
        <p className="text:base xl:text-xl">
          I agree
          <a href="#" className="text-green-dark mx-3">
            terms and conditions
          </a>
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
      </div>
      <ErrorMessage
        name="termCheck"
        component="p"
        className="label-error mt-6"
      />
      <p className="mt-12 text-base">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our <span className="text-green-light">privacy policy</span>.
      </p>
      <div className="flex justify-center items-center gap-10 ">
        <button className="btn-teetag yellow w-full" type="submit">
          place order
        </button>
      </div>
    </>
  );
};

export default PaymentMethod;
