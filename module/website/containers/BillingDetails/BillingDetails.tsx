import BillingForm from "@/website/components/BillingForm/BillingForm";
import TagForm from "@/website/components/TagForm/TagForm";
import { getDefaultMinionCode } from "@/website/lib/networkCalls/cartFunctions";
import { createOrder } from "@/website/lib/networkCalls/storeFunctions";
import {
  Billing,
  BillingDetailsProps,
  Order,
  Shipping,
} from "@/website/lib/types/wooCommerceTypes";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateBilling, updateShipping } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import CartDetails from "../CartDetails/CartDetails";

const BillingDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [defaultcode, setdefaultCode] = useState("");
  const [isValid, setisValid] = useState<boolean>(true);
  const [codeResponse, setcodeResponse] = useState<any>(null);
  useEffect(() => {
    getDefaultMinionCode().then((res) => {
      if (res.status === 200) {
        setdefaultCode(res.result.chain_code?.code || null);
      }
    });
  }, []);
  const initialValues: BillingDetailsProps = {
    name: user?.name ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "",
    postalCode: user?.postcode ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    shirtForSelf: false,
    tagName: "",
    tagEmail: "",
    tagAddress: "",
    tagPhone: "",
    tagState: "",
    tagCity: "",
    tagPostalCode: "",
    termCheck: false,
    paymentMethod: "",
    code: defaultcode,
  };
  const validate = (values: BillingDetailsProps) => {
    let errors: FormikValues = {};
    if (!values.name) {
      errors.name = "Name is Required";
    }
    if (!values.address) {
      errors.address = "Address is Required";
    }
    if (!values.city) {
      errors.city = "City is Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.state) {
      errors.state = "State is Required";
    }
    if (!values.postalCode) {
      errors.postalCode = "Postal Code is Required";
    }

    if (!values.termCheck) {
      errors.termCheck = "Term and Condition Required";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Payment Method is Required";
    }
    if (!codeResponse && !isValid) {
      errors.code = "Invalid Code";
    } else "";

    if (!isDisabled) {
      if (!values.tagName) {
        errors.tagName = "Name is Required";
      }
      if (
        values.tagEmail &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.tagEmail)
      ) {
        errors.tagEmail = "Invalid email address";
      }

      if (!values.tagAddress) {
        errors.tagAddress = "Address is Required";
      }

      if (!values.tagPhone) {
        errors.tagPhone = "Phone is Required";
      } else if (!/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(values.tagPhone)) {
        errors.tagPhone = "Please enter a valid phone number with 10 digits.";
      }

      if (!values.tagAddress) {
        errors.tagAddress = "Address is Required";
      }

      if (!values.tagState) {
        errors.tagState = "State is Required";
      }

      if (!values.tagCity) {
        errors.tagCity = "City is Required";
      }
      if (!values.tagPostalCode) {
        errors.tagPostalCode = "Postal Code is Required";
      }
    }

    return errors;
  };

  const updateLocalShipment = (shipment: Shipping) => {
    dispatch(updateShipping(shipment));
  };

  const updateLocalBilling = (billing: Billing) => {
    dispatch(updateBilling(billing));
  };

  return (
    <section className="section">
      <div className="container">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            // if the User Buy Self Product
            if (isDisabled) {
              // For Amazon Pay
              if (values.paymentMethod === "amazon") {
                const obj = {
                  name: values.name,
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  phone: values.phone,
                  postal_code: values.postalCode,
                  state: values.state,
                };
                updateLocalBilling(obj);
                updateLocalShipment(obj);
                router.push("/amazonpay-confirm");
              }
              // Creating Order
              const orderObj: Order = {
                payment_method: values.paymentMethod,
                cart_id: user!.cart.id,
                chain_code: codeResponse,
                billing: {
                  name: values.name,
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  phone: values.phone,
                  postal_code: values.postalCode,
                  state: values.state,
                },
                shipping: {
                  name: values.name,
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  phone: "+1" + values.phone,
                  postal_code: values.postalCode,
                  state: values.state,
                },
              };
              const response = await createOrder(orderObj);
              response.status >= 400 && toast.error(response.message);
              if (response.status === 200) {
                // Success Page
                router.replace(response.result.url);
              }
            } else {
              if (values.paymentMethod === "amazon") {
                updateLocalBilling({
                  name: values.name,
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  phone: values.phone,
                  postal_code: values.postalCode,
                  state: values.state,
                });
                updateLocalShipment({
                  address: values.tagAddress,
                  city: values.tagCity,
                  name: values.tagName,
                  email: values.tagEmail,
                  phone: "+1" + values.tagPhone,
                  postal_code: values.tagPostalCode,
                  state: values.tagState,
                });
                router.push("/amazonpay-confirm");
              }
              // Creating Order Object
              const orderObj: Order = {
                payment_method: values.paymentMethod,
                cart_id: user!.cart.id,
                chain_code: codeResponse,
                billing: {
                  name: values.name,
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  phone: values.phone,
                  postal_code: values.postalCode,
                  state: values.state,
                },
                shipping: {
                  address: values.tagAddress,
                  city: values.tagCity,
                  name: values.tagName,
                  email: values.tagEmail,
                  phone: "+1" + values.tagPhone,
                  postal_code: values.tagPostalCode,
                  state: values.tagState,
                },
              };
              const response = await createOrder(orderObj);
              response.status >= 400 && toast.error(response.message);
              if (response.status === 200) {
                router.replace(response.result.url);
              }
            }
          }}
        >
          <Form className="grid grid-cols-1 gap-20 lg:grid-cols-12">
            <div className="col-span-full lg:col-span-6 xl:col-span-7">
              <BillingForm />
              <TagForm isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
            </div>
            <div className="col-span-full lg:col-span-6 xl:col-span-5">
              <CartDetails
                isValid={isValid}
                setIsValid={setisValid}
                response={codeResponse}
                setResponse={setcodeResponse}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default BillingDetails;
