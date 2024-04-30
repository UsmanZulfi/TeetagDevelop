import Heading from "@/website/components/Heading/Heading";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import {
  handleStatus,
  sendResetPasswordEmail,
} from "@/website/lib/networkCalls/authFunctions";
import { ApiResponse } from "@/website/lib/types/teetagTypes";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import SecondaryLayout from "module/website/layout/SecondaryLayout";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

interface ForgotPasswordProps {
  email: string;
}

const validate = (values: ForgotPasswordProps) => {
  const errors: FormikValues = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const ForgotPassword = () => {
  const initialValues: ForgotPasswordProps = {
    email: "",
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Forgot Password"
        metaTitle="forgot password"
        metaDesc=""
      />
      <div className="container">
        <div className="verification__box">
          <Heading title="Reset Password" />
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false);
              console.log({ values, actions });
              if (values.email) {
                const response: ApiResponse = await sendResetPasswordEmail(
                  values.email,
                );
                handleStatus(response);
              }
            }}
          >
            <Form>
              <div className="teetag__input mb-12">
                <label
                  htmlFor="email"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Email
                </label>
                <Field
                  type="email"
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

              <button
                type="submit"
                className="btn-teetag yellow w-full text-center"
              >
                Send
              </button>
            </Form>
          </Formik>
          <Link
            href="/signin"
            className="flex justify-center items-center gap-5 mt-20 text-xl text-center hover:text-green-light"
          >
            <Image
              src="/assets/left_arrow.png"
              width={24}
              height={24}
              alt="left_arrow"
            />
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
