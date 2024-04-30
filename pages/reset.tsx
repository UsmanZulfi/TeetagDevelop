import Heading from "@/website/components/Heading/Heading";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { resetPassword } from "@/website/lib/networkCalls/authFunctions";
import { ApiResponse } from "@/website/lib/types/teetagTypes";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import SecondaryLayout from "module/website/layout/SecondaryLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

interface ResetPasswordProps {
  password: string;
  confirmPassword: string;
}

const validate = (values: ResetPasswordProps) => {
  const errors: FormikValues = {};

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)) {
    errors.password =
      "Must Contain at least 8 Characters, One Uppercase, One Lowercase";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
};

const Reset = () => {
  const router = useRouter();
  const token = JSON.stringify(router.query.token);
  const initialValues: ResetPasswordProps = {
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Reset Password"
        metaTitle="reset Password"
        metaDesc=""
      />
      <div className="container">
        <div className="verification__box">
          <Heading title="Reset Password" />
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, actions) => {
              console.log({ values, actions });
              actions.setSubmitting(false);
              const response: ApiResponse = await resetPassword(
                values.password,
                token,
              );
              if (response.status === 200) {
                toast.success(response.message, {
                  style: {
                    padding: "16px",
                    color: "#0e0e0e",
                    backgroundColor: "#00ffcc",
                    fontSize: "20px",
                  },
                  iconTheme: {
                    primary: "#0e0e0e",
                    secondary: "#fff",
                  },
                });
                setTimeout(() => {
                  router.push("/signin");
                }, 2000);
              } else {
                toast.error(response.message, {
                  style: {
                    padding: "16px",
                    color: "#0e0e0e",
                    backgroundColor: "#00ffcc",
                    fontSize: "20px",
                  },
                  iconTheme: {
                    primary: "#0e0e0e",
                    secondary: "#fff",
                  },
                });
              }
            }}
          >
            <Form>
              <div className="teetag__input mb-12">
                <label
                  htmlFor="password"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__input mb-12">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <button
                type="submit"
                className="btn-teetag yellow w-full text-center"
              >
                Submit
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

export default Reset;

Reset.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
