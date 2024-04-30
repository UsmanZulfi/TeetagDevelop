import ImageUploader from "@/dashboard/components/ImageUploader/ImageUploader";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  createScholarshipReceipient,
  getApplication,
} from "@/website/lib/networkCalls/dashboard/scholarshipDetails";
import { uploadMultipleFile } from "@/website/lib/networkCalls/formFunctions";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { FileWithPath } from "react-dropzone";

interface ScholarshipReceipientDetailProps {
  application: any;
}

interface IParams extends ParsedUrlQuery {
  applicationId: string;
}

const validate = (values: any) => {
  const requiredFields = [
    "targetAmount",
    "firstParagraph",
    "secondParagraph",
    "thirdParagraph",
  ];

  const errors: FormikValues = requiredFields.reduce((acc, field) => {
    if (!values[field]) {
      acc[field] = "Required";
    }
    return acc;
  }, {});

  return errors;
};

const ScholarshipRecipientDetail = ({
  application,
}: ScholarshipReceipientDetailProps) => {
  const [firstImage, setFirstImage] = useState<FileWithPath | null>(null);
  const [secondImage, setSecondImage] = useState<FileWithPath | null>(null);
  const [thirdImage, setThirdImage] = useState<FileWithPath | null>(null);
  const router = useRouter();
  const { applicationId } = router.query as IParams;
  const initialValues: any = {
    email: application?.user.email ?? "",
    phone: application?.user.phone ?? "",
    name: application?.user.name ?? "",
  };
  return (
    <>
      <TitleHead
        title="Scholarship Receipient Detail"
        metaTitle="scholarship"
        metaDesc="scholarship"
      />

      <InnerHeader title="Scholarship Receipient Detail" />
      <div className="container">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values: any, actions: FormikHelpers<any>) => {
            actions.setSubmitting(false);
            const images = [firstImage, secondImage, thirdImage];

            const fileResponse = await uploadMultipleFile(images);

            if (fileResponse.status === 200) {
              const response = await createScholarshipReceipient(
                applicationId,
                {
                  name: values.name,
                  email: values.email,
                  phone: values.phone,

                  target_amount: values.targetAmount,
                  paragraphs: [
                    values.firstParagraph,
                    values.secondParagraph,
                    values.thirdParagraph,
                  ],
                  images: [fileResponse.result.urls],
                },
              );
              handleStatus(response);
            }
          }}
        >
          <Form>
            <div className="grid gap-10 mt-12 grid-cols-12">
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
                <label
                  htmlFor="name"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Name
                </label>
                <Field type="text" name="name" id="name" readOnly />
              </div>
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
                <label
                  htmlFor="email"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Email
                </label>
                <Field type="text" name="email" id="email" readOnly />
              </div>
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
                <label
                  htmlFor="phone"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Phone
                </label>
                <Field type="text" name="phone" id="phone" readOnly />
              </div>

              <div className="teetag__input col-span-12 ">
                <label
                  htmlFor="targetAmount"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Target Amount
                </label>
                <Field
                  type="number"
                  name="targetAmount"
                  id="targetAmount"
                  placeholder="Enter amount here"
                />
                <ErrorMessage
                  name="targetAmount"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__textareasc col-span-12 sm:col-span-6 lg:col-span-6">
                <label
                  htmlFor="firstParagraph"
                  className="block mb-4 capitalize font-fugaz"
                >
                  1st Paragraph
                </label>
                <Field
                  as="textarea"
                  name="firstParagraph"
                  id="firstParagraph"
                  placeholder="Enter first paragraph here"
                />
                <ErrorMessage
                  name="firstParagraph"
                  component="p"
                  className="label-error mt-6"
                />
              </div>

              <ImageUploader
                name="firstParagraphImage"
                label="1st Paragraph Image"
                image={firstImage}
                setImage={setFirstImage}
              />

              <div className="teetag__textareasc col-span-12 sm:col-span-6 lg:col-span-6">
                <label
                  htmlFor="secondParagraph"
                  className="block mb-4 capitalize font-fugaz"
                >
                  2nd Paragraph
                </label>
                <Field
                  as="textarea"
                  name="secondParagraph"
                  id="secondParagraph"
                  placeholder="Enter second paragraph here"
                />
                <ErrorMessage
                  name="secondParagraph"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <ImageUploader
                name="secondParagraphImage"
                label="2nd Paragraph Image"
                image={secondImage}
                setImage={setSecondImage}
              />

              <div className="teetag__textareasc col-span-12 sm:col-span-6 lg:col-span-6">
                <label
                  htmlFor="thirdParagraph"
                  className="block mb-4 capitalize font-fugaz"
                >
                  3rd Paragraph
                </label>
                <Field
                  as="textarea"
                  name="thirdParagraph"
                  id="thirdParagraph"
                  placeholder="Enter third paragraph here"
                />
                <ErrorMessage
                  name="thirdParagraph"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <ImageUploader
                name="thirdParagraphImage"
                label="3rd Paragraph Image"
                image={thirdImage}
                setImage={setThirdImage}
              />
            </div>
            <button type="submit" className="btn-teetag yellow">
              submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ScholarshipRecipientDetail;

ScholarshipRecipientDetail.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { applicationId } = context.params as IParams;
  try {
    const application = await getApplication(applicationId);
    return {
      props: {
        application: application.data.result.application,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
