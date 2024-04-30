import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  requestBulkOrder,
  uploadMultipleFile,
} from "@/website/lib/networkCalls/formFunctions";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from "formik";
import { useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Toaster } from "react-hot-toast";
import LoaderTransparent from "../LoaderTransparent/LoaderTransparent";

interface OrderFormProps {
  name: string;
  state: string;
  email: string;
  phone: string;
  whatIsThisFor: string;
  quantity: number;
  platePhrase: string;
  whenShirtNeed: string;
  additionalNotes: string;
}

const validate = (values: OrderFormProps) => {
  let errors: FormikValues = {};
  if (!values.name) {
    errors.name = "Name is Required";
  }

  if (!values.state) {
    errors.state = "States is Required";
  }

  if (!values.whatIsThisFor) {
    errors.whatIsThisFor = "Field is Required";
  }

  if (!values.quantity) {
    errors.quantity = "Quantity is Required";
  } else if (values.quantity < 10) {
    errors.quantity = "Quantity must be greater than 10";
  }

  if (!values.platePhrase) {
    errors.platePhrase = "Plate Phrase is Required";
  }

  if (!values.whenShirtNeed) {
    errors.whenShirtNeed = "Field is Required";
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

  return errors;
};

const OrderForm = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<FileWithPath[]>([]);
  const [imageFileError, setImageFileError] = useState<String | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFile: FileWithPath[]) => {
      if (acceptedFile.length > 0) {
        if (imageFile.length > 2) {
          setImageFileError("Limit Exceeded");
          return;
        }
        setImageFile((prevState) => [...prevState, acceptedFile[0]]);

        setImageFileError(null);
      }
    },
  });
  const removeFile = (index) => {
    setImageFile((prevState) => {
      const updatedFiles = [...prevState];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };
  useEffect(() => {
    if (imageFile.length >= 0 && imageFile.length <= 2) {
      setImageFileError(null);
    }
  }, [imageFile]);
  const initialValues: OrderFormProps = {
    email: "",
    phone: "",
    name: "",
    additionalNotes: "",
    platePhrase: "",
    quantity: null,
    state: "",
    whatIsThisFor: "",
    whenShirtNeed: "",
  };

  return (
    <>
      {loader && <LoaderTransparent />}
      <Toaster position="top-center" reverseOrder={false} />
      <section>
        <div className="container">
          <h2 className="uppercase h3 text-yellow-primary font-fugaz">
            Bulk order details
          </h2>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (
              values: OrderFormProps,
              actions: FormikHelpers<OrderFormProps>,
            ) => {
              actions.setSubmitting(false);
              if (imageFile.length === 0) {
                setImageFileError("Images is Required");
              }
              if (imageFile.length) {
                setLoader(true);
                const fileResponse = await uploadMultipleFile(imageFile);
                if (fileResponse.status === 200) {
                  const urls = fileResponse.result.urls;
                  const response = await requestBulkOrder({
                    name: values.name,
                    email: values.email,
                    due_date: values.whenShirtNeed,
                    quantity: values.quantity,
                    images: urls,
                    note: values.additionalNotes,
                    objective: values.whatIsThisFor,
                    phone: "+1" + values.phone,
                    plate_phrase: values.platePhrase,
                    state: values.state,
                  });
                  setLoader(false);
                  handleStatus(response);
                } else {
                  setLoader(false);
                }
              } else {
                setLoader(false);
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
                <div className="teetag__input">
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
                    htmlFor="whatIsThisFor"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    What is This For?
                  </label>
                  <Field
                    type="text"
                    name="whatIsThisFor"
                    id="whatIsThisFor"
                    placeholder="Enter Here"
                  />
                  <ErrorMessage
                    name="whatIsThisFor"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>

                <div className="teetag__input">
                  <label
                    htmlFor="quantity"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Quantity
                    <span className="ml-2 text-xl capitalize font-fugaz text-yellow-primary">
                      (Min 10)
                    </span>
                  </label>
                  <Field
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Enter Your Quantity"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>

                <div className="teetag__input">
                  <label
                    htmlFor="platePhrase"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Plate Phrase
                  </label>
                  <Field
                    type="text"
                    name="platePhrase"
                    id="platePhrase"
                    placeholder="Enter Your Plate Phrase"
                  />
                  <ErrorMessage
                    name="platePhrase"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="whenShirtNeed"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    When Do You Need Shirts By?
                  </label>
                  <Field
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    name="whenShirtNeed"
                    id="whenShirtNeed"
                    placeholder="Enter Here"
                  />
                  <ErrorMessage
                    name="whenShirtNeed"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="additionalNotes"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Any Additional Notes
                  </label>
                  <Field
                    type="text"
                    name="additionalNotes"
                    id="additionalNotes"
                    placeholder="Enter Here"
                  />
                </div>
              </div>
              <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
                upload images or pdf
                <span className="ml-2 text-xl capitalize font-fugaz text-yellow-primary">
                  (For Reference Max 3)
                </span>
              </p>
              <div {...getRootProps({ className: "teetag__dropzone " })}>
                <input {...getInputProps()} />
                <p className="h8 cursor-pointer">
                  Drag & drop or upload{" "}
                  <em className="text-md opacity-40">
                    (Only jpg and png images will be accepted)
                  </em>
                </p>
              </div>
              <aside className="mt-6">
                <ul>
                  {imageFile.map((file, index) => (
                    <li key={index} className="mb-2">
                      <span>{file.name}</span>
                      <button
                        className="ml-5 text-red-dark"
                        onClick={() => removeFile(index)}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>
              {imageFileError && (
                <p className="label-error mt-6">{imageFileError}</p>
              )}
              <button type="submit" className="btn-teetag yellow">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default OrderForm;
