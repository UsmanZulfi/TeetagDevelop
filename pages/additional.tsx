import Heading from "@/website/components/Heading/Heading";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { useAppDispatch } from "@/website/lib/hooks/hooks";
import {
  handleStatus,
  sendPhoneOtp,
  updateUserPhone,
} from "@/website/lib/networkCalls/authFunctions";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import SecondaryLayout from "module/website/layout/SecondaryLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { addPhoneNumber } from "store/features/auth/authSlice";

interface AdditionalProps {
  phone: string;
}

const validate = (values: AdditionalProps) => {
  let errors: FormikValues = {};
  if (!values.phone) {
    errors.phone = "Phone is Required";
  } else if (!/^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(values.phone)) {
    errors.phone = "Please enter a valid phone number with 10 digits.";
  }

  return errors;
};

const Additional = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues: AdditionalProps = {
    phone: "",
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Additional Info"
        metaTitle="additional info"
        metaDesc=""
      />
      <div className="container">
        <div className="verification__box">
          <Heading title="Additional Info" />
          <p className="h7 mb-12 text-center">
            Please provide phone number in order to complete your account.
          </p>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (
              values: AdditionalProps,
              actions: FormikHelpers<AdditionalProps>,
            ) => {
              actions.setSubmitting(false);
              let phone = `+1${values.phone}`;
              const response = await updateUserPhone(phone);
              handleStatus(response);
              if (response.status === 200) {
                dispatch(addPhoneNumber(String(phone)));
                await sendPhoneOtp();
                router.replace("/cart");
              }
            }}
          >
            <Form>
              <div className="teetag__input mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Phone Number
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
              <button
                type="submit"
                className="btn-teetag yellow w-full text-center"
              >
                Proceed to Continue
              </button>
            </Form>
          </Formik>

          <Link
            href="/"
            className="flex justify-center items-center gap-5 mt-20 text-xl text-center hover:text-green-light"
          >
            <Image
              src="/assets/left_arrow.png"
              width={24}
              height={24}
              alt="left_arrow"
            />
            Back to Main Website
          </Link>
        </div>
      </div>
    </>
  );
};

export default Additional;

Additional.getLayout = function (page: React.ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
