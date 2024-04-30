import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  createMinion,
  uploadFile,
} from "@/website/lib/networkCalls/formFunctions";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface MinionFormProps {
  name: string;
  email: string;
  phone: string;
  state: string;
  age: string;
  reason: string;
  story: string;
  image: string;
}

const MinionForm = () => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const validate = (values: MinionFormProps) => {
    let errors: FormikValues = {};
    if (!values.name) {
      errors.name = "Name is Required";
    }

    if (!values.state) {
      errors.state = "State is Required";
    }

    if (!values.age) {
      errors.age = "Age is Required";
    }

    if (!values.reason) {
      errors.reason = "Field is Required";
    }

    if (!values.story) {
      errors.story = "Story is Required";
    }

    if (!file) {
      errors.image = "Image is Required";
    }

    return errors;
  };
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const fileWithPath = acceptedFiles[0];
      setFile(fileWithPath);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });
  const user = useSelector((state: RootState) => state.auth.user);
  const initialValues: MinionFormProps = {
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    name: user?.name ?? "",
    age: "",
    state: user?.state ?? "",
    reason: "",
    story: "",
    image: "",
  };
  return (
    <section className="section">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <h2 className="uppercase h3 text-yellow-primary font-fugaz">
          Apply here to be a State Ambassador
        </h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (
            values: MinionFormProps,
            actions: FormikHelpers<MinionFormProps>,
          ) => {
            actions.setSubmitting(false);
            if (file) {
              const fileResponse = await uploadFile(file);
              if (fileResponse.status === 200) {
                const response = await createMinion({
                  age: values.age,
                  email: values.email,
                  reason: values.reason,
                  name: values.name,
                  phone: "+1" + values.phone,
                  state: values.state,
                  story: values.story,
                  image: fileResponse.result.url,
                });
                handleStatus(response);
              }
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
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
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
                  readOnly
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
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
                  readOnly
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
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
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
                <label
                  htmlFor="age"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Age
                </label>
                <Field
                  type="text"
                  name="age"
                  id="age"
                  placeholder="Enter Here"
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
                <label
                  htmlFor="reason"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Your Loss
                </label>
                <Field
                  type="text"
                  name="reason"
                  id="reason"
                  placeholder="Enter Your Loss"
                />
                <ErrorMessage
                  name="reason"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="col-span-12">
                <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
                  Upload Image
                </p>
                <div {...getRootProps({ className: "teetag__dropzone " })}>
                  <input {...getInputProps()} />
                  {file ? (
                    <p className="h8">{file.name}</p>
                  ) : (
                    <p className="h8 cursor-pointer">Drag & drop or upload</p>
                  )}
                </div>
                <ErrorMessage
                  name="image"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
              <div className="teetag__textarea col-span-12">
                <label
                  htmlFor="story"
                  className="block mb-4 capitalize font-fugaz"
                >
                  Your Story
                </label>
                <p className="text-xl mb-6">
                  Talk about your background, your loss & how you've dealt with
                  it, family, hobbies etc. Anything you want - just want to
                  learn more about you,
                </p>
                <Field
                  component="textarea"
                  name="story"
                  id="story"
                  placeholder="Enter your story here"
                  className="resize-none"
                />
                <ErrorMessage
                  name="story"
                  component="p"
                  className="label-error mt-6"
                />
              </div>
            </div>
            <button type="submit" className="btn-teetag yellow">
              submit
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default MinionForm;
