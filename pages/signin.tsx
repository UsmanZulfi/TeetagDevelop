import Heading from "@/website/components/Heading/Heading";
import LoadingSpinner from "@/website/components/LoadingSpinner/LoadingSpinner";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getCart, insertCart } from "@/website/lib/networkCalls/cartFunctions";
import { SignInProps } from "@/website/lib/types/teetagTypes";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { login, updateCart } from "store/features/auth/authSlice";
import { RootState } from "store/store";
import styles from "../module/website/containers/WhatIsTeetag/WhatIsTeetag.module.css";

const validate = (values: SignInProps) => {
  const errors: FormikValues = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const phoneRegex = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;

  if (!values.login) {
    errors.login = "Email or Phone is Required";
  } else if (!emailRegex.test(values.login) && !phoneRegex.test(values.login)) {
    errors.login =
      "Please enter a valid phone number with 10 digits, or a valid email address in the format 'username@example.com'.";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  }

  return errors;
};

const SignIn = () => {
  const cart = useSelector((state: RootState) => state.auth.cart);
  cart && localStorage.setItem("cart", JSON.stringify(cart));
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const initialValues: SignInProps = {
    login: "",
    password: "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="main-container">
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Login"
        metaTitle="Login"
        metaDesc="AMERICA'S LARGEST GAME OF TAG For a Greater Cause!"
      />
      <div className="container">
        <div className="login__box">
          <Heading title="Login" />
          <div className="relative grid grid-cols-1 gap-24 py-4 overflow-hidden lg:gap-56 lg:items-center lg:grid-cols-2">
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(false);
                setIsSubmitting(true);
                const response = await dispatch(
                  login({
                    loginOption: values.login.includes("@") // Check if it's an email address
                      ? values.login // If it's an email, don't change it
                      : "+1" + values.login, // If it's a phone number, add the country code
                    password: values.password,
                  })
                );
                localStorage.setItem(
                  "userToken",
                  JSON.stringify(response.payload.accessToken)
                );
                if (response.type === "auth/login/fulfilled") {
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
                } else {
                  setIsSubmitting(false);
                  toast.error(response.payload);
                }
              }}
            >
              <Form className="flex flex-col justify-center gap-10">
                <div className="teetag__input width99">
                  <label
                    htmlFor="login"
                    className="block mb-6 capitalize font-fugaz"
                  >
                    Email/Phone Number
                  </label>
                  <Field
                    type="text"
                    name="login"
                    id="login"
                    placeholder="Enter here"
                    className="height45"
                  />
                  <ErrorMessage
                    name="login"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input width99">
                  <label
                    htmlFor="password"
                    className="block mb-6 capitalize font-fugaz"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter here"
                    className="height45"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-x  hover:text-green-light"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {(isSubmitting && <LoadingSpinner />) || (
                  <button className="btn-teetag yellow m-0 width99 padding-top-5">
                    Login
                  </button>
                )}
              </Form>
            </Formik>
            <div className="flex items-center justify-center">
              <div className="width97">
                <div className="md:grid grid-cols-1 flex justify-center items-start gap-10">
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
                      "/auth/facebook"
                    }
                    className="btn__teetag_secondary width48"
                  >
                    <FaFacebookF className="text-3xl md:text-lg" />
                    <span className="hidden md:inline-block">
                      Login with Facebook
                    </span>
                  </Link>
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
                      "/auth/google"
                    }
                    className="btn__teetag_secondary width48"
                  >
                    <FaGoogle className="text-3xl md:text-lg" />
                    <span className="hidden md:inline-block">
                      Login with Google
                    </span>
                  </Link>
                </div>

                <p className="flex items-center justify-center gap-5 mt-28 text-x text-center">
                  Don't Have an Account?
                  <Link href="/signup" className="text-green-light">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
            <div className="Login__box-center">
              <p className="text-xl uppercase">OR</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex justify-center items-center gap-5 mt-20 text-x text-center hover:text-green-light"
          >
            <Image
              src="/assets/left_arrow.png"
              width={24}
              height={24}
              alt="left_arrow"
            />
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
