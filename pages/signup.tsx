import Heading from "@/website/components/Heading/Heading";
import Heading3 from "@/website/components/Heading3/Heading3";
import LoadingSpinner from "@/website/components/LoadingSpinner/LoadingSpinner";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getCart, insertCart } from "@/website/lib/networkCalls/cartFunctions";
import { SignUpProps } from "@/website/lib/types/teetagTypes";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { register, updateCart } from "store/features/auth/authSlice";

const validate = (values: SignUpProps) => {
  let errors: FormikValues = {};
  if (!values.firstName) {
    errors.firstName = "First Name is Required";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is Required";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)) {
    errors.password =
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase";
  }

  if (!values.phone) {
    errors.phone = "Phone is Required";
  } else if (!/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number with 10 digits.";
  }

  return errors;
};

const SignUp = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [formValues, setFormValues] = useState<SignUpProps>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const initialValues: SignUpProps = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    password: "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="main-container-signup">
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Sign Up"
        metaTitle="Sign Up"
        metaDesc="AMERICA'S LARGEST GAME OF TAG For a Greater Cause!"
      />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-40 signup_box">
        {windowWidth > 1090 ? (
            <div className="pt-32 lg:pt-64 order-2 lg:order-1">
              <div className="lg:max-w-2xl">
                <Heading3 title="What is TEETAG?" />
              </div>
              <p className="h9 mt-16 lg:mt-30">
                TeeTag is simple… It’s TAG! America’s LARGEST game of tag through
                the use of custom t-shirts in order to help raise money for
                children who’ve lost a parent to Cancer. TeeTag spans across all
                50 states of America and is meant to be a fun, interactive,
                pay-it-forward game to raise money for a greater cause.
              </p>
              <a href="/story">
                <button className="btn-teetag yellow padding-top-5" type="submit">
                  View My Story
                </button>
              </a>
            </div>
          ) : null}
          <div className="signup__box order-1 lg:order-2">
            <Heading title="Sign Up" />
            <div className="relative">
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={async (
                  values: SignUpProps,
                  actions: FormikHelpers<SignUpProps>
                ) => {
                  actions.setSubmitting(false);
                  setIsSubmitting(true);
                  setFormValues(values);
                  const response = await dispatch(
                    register({
                      name: values.firstName + " " + values.lastName,
                      email: values.email,
                      password: values.password,
                      phone: "+1" + values.phone,
                    })
                  );
                  if (response.type === "auth/register/rejected") {
                    setIsSubmitting(false);
                    toast.error(response.payload);
                  } else {
                    localStorage.setItem(
                      "userToken",
                      JSON.stringify(response.payload.accessToken)
                    );

                    const cart = JSON.parse(localStorage.getItem("cart"));
                    if (cart) {
                      //insert cart
                      const res = await insertCart(cart);
                      if (res.status === 200) {
                        const res = await getCart();
                        if (res.status === 200) {
                          dispatch(updateCart(res.result.cart));
                        }
                      }
                    } else dispatch(updateCart(response.payload.user.cart));
                  }
                }}
              >
                <Form className="flex flex-col justify-center gap-10">
                  <div className="grid grid-cols-2 gap-5 margin-top">
                    <div className="col-span-1 teetag__input">
                      <label
                        htmlFor="firstName"
                        className="block mb-4 capitalize font-fugaz"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter here"
                        className="height45"
                        defaultValue={formValues.firstName}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="label-error mt-6"
                      />
                    </div>
                    <div className="col-span-1 teetag__input">
                      <label
                        htmlFor="lastName"
                        className="block mb-4 capitalize font-fugaz"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="height45"
                        placeholder="Enter here"
                        defaultValue={formValues.lastName}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="label-error mt-6"
                      />
                    </div>
                  </div>
                  <div className="teetag__input margin-top">
                    <label
                      htmlFor="email"
                      className="block mb-4 capitalize font-fugaz mt-6 md:mt-0"
                      
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="height45"
                      placeholder="Enter here"
                      defaultValue={formValues.email}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="label-error mt-6"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5 margin-top">
                    <div className="col-span-1 teetag__input">
                      <label
                        htmlFor="phone"
                        className="block mb-4 capitalize font-fugaz mt-6 md:mt-0"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        name="phone"
                        id="phone"
                        className="height45"
                        placeholder="Enter here"
                        defaultValue={formValues.phone}
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="label-error mt-6"
                      />
                    </div>
                    <div className="col-span-1 teetag__input">
                      <label
                        htmlFor="password"
                        className="block mb-4 capitalize font-fugaz mt-6 md:mt-0"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="height45"
                        placeholder="Enter here"
                        defaultValue={formValues.password}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="label-error mt-6"
                      />
                    </div>
                  </div>
                  {(isSubmitting && <LoadingSpinner />) || (
                    <button
                  
                      className=  {windowWidth >  1080 ? "btn-teetag yellow margin-top-5 padding-top-5" :  "btn-teetag yellow margin-top-5 padding-top-10"}
                      type="submit"
                    >
                      Sign Up
                    </button>
                  )}
                </Form>
              </Formik>
              <div className="signup__box-center py-16">
                <p className="text-xl uppercase">OR</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <div className="md:grid grid-cols-1 flex justify-center items-start gap-10">
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
                        "/auth/facebook"
                      }
                      className="mb-12 btn__teetag_secondary margin-top width48"
                    >
                      <FaFacebookF className="text-xl" />
                      <span className="hidden md:inline-block">
                        Sign up with Facebook
                      </span>
                    </Link>
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
                        "/auth/google"
                      }
                      className="btn__teetag_secondary margin-top width48"
                    >
                      <FaGoogle className="text-xl" />
                      <span className="hidden md:inline-block">
                        Sign up with Google
                      </span>
                    </Link>
                  </div>
                  <p className="block mt-24 text-xl text-center margin-top-30">
                    Already have an account?
                    <Link href="/signin" className="ml-3 text-green-light">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="flex justify-center items-center gap-5 mt-8 text-xl text-center hover:text-green-light"
            >
              <Image
                src="/assets/left_arrow.png"
                width={24}
                height={24}
                alt="left_arrow"
              />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
