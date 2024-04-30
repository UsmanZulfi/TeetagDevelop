import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import { saveContactForm } from "@/website/lib/networkCalls/storeFunctions";
import { ContactProps } from "@/website/lib/types/teetagTypes";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import { Toaster } from "react-hot-toast";

const validate = (values: ContactProps) => {
  let errors: FormikValues = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }
  if (!values.subject) {
    errors.subject = "Subject is Required";
  }
  if (!values.message) {
    errors.message = "Message is Required";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const Contact = () => {
  const initialValues: ContactProps = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead title="Contact Us" metaTitle="contact us" metaDesc="" />
      <Header />
      <PageHeader title="Contact Us" />
      <section className="section">
        <div className="container">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (
              values: ContactProps,
              actions: FormikHelpers<ContactProps>,
            ) => {
              actions.setSubmitting(false);
              const response = await saveContactForm({
                email: values.email,
                message: values.message,
                name: values.name,
                subject: values.subject,
              });
              handleStatus(response);
            }}
          >
            <Form>
              <div className="grid grid-cols-12 gap-10">
                <div className="teetag__input col-span-12 lg:col-span-4">
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
                <div className="teetag__input col-span-12 lg:col-span-4">
                  <label
                    htmlFor="email"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="name"
                    placeholder="Enter Your Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input col-span-12 lg:col-span-4">
                  <label
                    htmlFor="subject"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Subject
                  </label>
                  <Field
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Enter Your Subject"
                  />
                  <ErrorMessage
                    name="subject"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__textarea col-span-12">
                  <label
                    htmlFor="message"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Message
                  </label>
                  <Field
                    component="textarea"
                    name="message"
                    id="message"
                    placeholder="Enter Your Message"
                    className="resize-none"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
              </div>
              <button type="submit" className="btn-teetag yellow">
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
