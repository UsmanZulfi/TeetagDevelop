import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { Loader } from "@/website/components/Loader/Loader";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getPaymentDetail } from "@/website/lib/networkCalls/paymentFunction";
import { contribute } from "@/website/lib/networkCalls/storeFunctions";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateBilling } from "store/features/auth/authSlice";
import { RootState } from "store/store";

interface ContributionCheckoutProps {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  paymentMethod: string;
}

const validate = (values: ContributionCheckoutProps) => {
  let errors: FormikValues = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Phone is Required";
  } else if (!/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number with 10 digits.";
  }

  if (!values.state) {
    errors.state = "State is Required";
  }

  if (!values.city) {
    errors.city = "City is Required";
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = "Payment Method is Required";
  }

  return errors;
};

const ContributionCheckout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { transaction_id } = router.query;
  const price = localStorage.getItem("contribute_price");
  const user = useSelector((state: RootState) => state.auth.user);
  const parsePrice = JSON.parse(String(price));
  const initialValues: ContributionCheckoutProps = {
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
    paymentMethod: "",
  };

  useEffect(() => {
    const getTransaction = async () => {
      const response = await getPaymentDetail(String(transaction_id));
      toast.error(response.message);
    };
    if (router.isReady) {
      if (transaction_id) {
        getTransaction();
      }
    }
  }, [transaction_id, router]);

  useEffect(() => {
    if (!parsePrice) {
      router.replace("/contribution");
    }
  }, [parsePrice]);

  return parsePrice ? (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Contribution Checkout"
        metaTitle="Contribution Checkout"
        metaDesc=""
      />
      <Header />
      <PageHeader title="Contribution Checkout" />
      <section className="section">
        <div className="container">
          <h2 className="uppercase h3 text-yellow-primary font-fugaz">
            Billing details
          </h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (
              values: ContributionCheckoutProps,
              actions: FormikHelpers<ContributionCheckoutProps>,
            ) => {
              actions.setSubmitting(false);
              if (values.paymentMethod === "amazon") {
                dispatch(
                  updateBilling({
                    address: "",
                    city: values.city,
                    email: values.email,
                    name: values.name,
                    phone: "+1" + values.phone,
                    postal_code: "",
                    state: values.state,
                  }),
                );
                router.push("/amazonpay-contribution-confirm");
              } else {
                const response = await contribute({
                  amount: parsePrice,
                  payment_method: values.paymentMethod,
                  billing: {
                    city: values.city,
                    state: values.state,
                  },
                });
                if (response.status === 200) {
                  router.push(response.result.url);
                }
              }
            }}
          >
            <Form>
              <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-2 lg:grid-cols-3">
                <div className="teetag__input">
                  <label
                    htmlFor="name"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="phone"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Your Phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="email"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="city"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter Here"
                  />
                  <ErrorMessage
                    name="city"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="state"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    State
                  </label>
                  <Field as="select" name="state" id="state">
                    <option value="">Select</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
              </div>
              <h3 className="mt-32 mb-8 uppercase h4 font-fugaz text-yellow-primary">
                Payment Method
              </h3>
              <div className="flex flex-wrap md:flex-wrap items-center gap-16 md:gap-44 mb-16">
                <div className="teetag__radio">
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
                <div className="teetag__radio">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
                  />
                  <label className="uppercase font-fugaz" htmlFor="paypal">
                    paypal
                  </label>
                </div>
                <div className="teetag__radio">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    id="amazon"
                    value="amazon"
                  />
                  <label className="uppercase font-fugaz" htmlFor="amazon">
                    Amazon Pay
                  </label>
                </div>
              </div>
              <ErrorMessage
                name="paymentMethod"
                component="p"
                className="label-error mt-6"
              />
              <button type="submit" className="btn-teetag yellow ">
                Contribute Now
              </button>
            </Form>
          </Formik>
        </div>
      </section>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default ContributionCheckout;
