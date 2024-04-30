import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import LoaderTransparent from "@/website/components/LoaderTransparent/LoaderTransparent";
import PageHeader from "@/website/components/PageHeader/PageHeader";
import TeetagList from "@/website/components/TeetagList/TeetagList";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  applyScholarship,
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
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface ApplyScholarShipProps {
  name: string;
  email: string;
  phone: string;
  state: string;
  age: string;
  reason: string;
}

const validate = (values: ApplyScholarShipProps) => {
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

  return errors;
};

const ApplyScholarship = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<FileWithPath | null>(null);
  const [storyFile, setStoryFile] = useState<FileWithPath | null>(null);
  const [lossFile, setLossFile] = useState<FileWithPath[]>([]);
  const [imageFileError, setImageFileError] = useState<String | null>(null);
  const [storyFileError, setStoryFileError] = useState<String | null>(null);
  const [lossFileError, setLossFileError] = useState<String | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const initialValues: ApplyScholarShipProps = {
    name: "",
    age: "",
    email: "",
    phone: "",
    state: "",
    reason: "",
  };
  const { getRootProps: getRootImageProps, getInputProps: getInputImageProps } =
    useDropzone({
      multiple: false,
      accept: {
        "image/png": [],
        "image/jpeg": [],
        "image/jpg": [],
      },
      onDrop: (acceptedFile: FileWithPath[]) => {
        if (acceptedFile.length > 0) {
          const fileWithPath = acceptedFile[0];
          setImageFile(fileWithPath);
          setImageFileError(null);
        }
      },
    });
  const {
    getRootProps: getRootStoryDocProps,
    getInputProps: getInputStoryDocProps,
  } = useDropzone({
    multiple: false,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    onDrop: (acceptedFile: FileWithPath[]) => {
      if (acceptedFile.length > 0) {
        const fileWithPath = acceptedFile[0];
        setStoryFile(fileWithPath);
        setStoryFileError(null);
      }
    },
  });
  const {
    getRootProps: getRootLossDocProps,
    getInputProps: getInputLossDocProps,
  } = useDropzone({
    maxFiles: 2,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    onDrop: (acceptedFile: FileWithPath[]) => {
      if (acceptedFile.length > 0) {
        // const fileWithPath = acceptedFile[0];
        if (lossFile.length > 1) {
          setLossFileError("Limit Exceeded");
          return;
        }
        setLossFile((prevState) => [...prevState, acceptedFile[0]]);

        setLossFileError(null);
      }
    },
  });
  const removeFile = (index) => {
    setLossFile((prevState) => {
      const updatedFiles = [...prevState];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };
  useEffect(() => {
    if (lossFile.length >= 0 && lossFile.length < 2) {
      setLossFileError(null);
    }
  }, [lossFile]);

  return (
    <>
      {loader && <LoaderTransparent />}
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Apply Scholarship"
        metaTitle="Apply Scholarship"
        metaDesc=""
      />
      <Header />
      <PageHeader title="Apply to be a Scholarship Recipient" />
      <section className="section" style={{ paddingTop: "3rem" }}>
        <div className="container">
          <p className="text-white text-lg mb-10">
            TeeTag raises money for one individual in need at a time. If you
            meet the following criteria, feel free to apply to be a future
            scholarship recipient.
          </p>
          <TeetagList
            ulClassConfig={"teetag-list sm"}
            liClassConfig={"ml-3 text-yellow-primary text-lg"}
            items={[
              "Ages 13-18",
              "Has lost a parent to any form of cancer",
              "In need of financial support for college",
            ]}
          />

          <p className="text-white text-lg mt-10">
            {" "}
            It is not guaranteed that you will be accepted and become in line to
            become a future scholarship recipient. Furthermore, even if you are
            accepted, there is no guarantee that you will receive the funds that
            TeeTag aims to raise. This uncertainty arises because the funds we
            seek to secure are directly tied to TeeTag's success.
          </p>
          <br />
          <p className="text-white text-lg">
            Please feel free to contact me if you have any questions or issues
            at Jack@teetag.com
          </p>
          <p className="text-white text-lg mt-10 mb-14">
            Below are the required fields to apply. Good luck :)
          </p>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (
              values: ApplyScholarShipProps,
              actions: FormikHelpers<ApplyScholarShipProps>,
            ) => {
              actions.setSubmitting(false);
              if (!imageFile) {
                setImageFileError("Image is Required");
              }
              if (!storyFile) {
                setStoryFileError("Story Document is Required");
              }
              if (lossFile.length === 0) {
                setLossFileError("Proof of Loss Document is Required");
              }
              if (imageFile && storyFile && lossFile.length) {
                if (lossFile.length === 1) {
                  const fileArray = [imageFile, storyFile, lossFile[0]];
                  if (fileArray) {
                    setLoader(true);
                    const fileResponse = await uploadMultipleFile(fileArray);
                    if (fileResponse.status === 200) {
                      const urls = fileResponse.result.urls;
                      const response = await applyScholarship({
                        name: values.name,
                        age: values.age,
                        email: user.email,
                        phone: user.phone,
                        reason: values.reason,
                        state: values.state,
                        image: {
                          src: String(urls[0]),
                          alt: "image",
                        },
                        story_document: [String(urls[1])],
                        proof_document: [String(urls[2])],
                      });
                      setLoader(false);
                      handleStatus(response);
                    } else {
                      setLoader(false);
                    }
                  }
                } else {
                  const fileArray = [
                    imageFile,
                    storyFile,
                    lossFile[0],
                    lossFile[1],
                  ];
                  if (fileArray) {
                    setLoader(true);
                    const fileResponse = await uploadMultipleFile(fileArray);
                    if (fileResponse.status === 200) {
                      const urls = fileResponse.result.urls;
                      const response = await applyScholarship({
                        name: values.name,
                        age: values.age,
                        email: user.email,
                        phone: user.phone,
                        reason: values.reason,
                        state: values.state,
                        image: {
                          src: String(urls[0]),
                          alt: "image",
                        },
                        story_document: [String(urls[1])],
                        proof_document: [String(urls[2]), String(urls[3])],
                      });
                      setLoader(false);
                      handleStatus(response);
                    } else {
                      setLoader(false);
                    }
                  }
                }
              }
            }}
          >
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                    htmlFor="email"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Email
                  </label>
                  <Field
                    value={user.email}
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
                    Phone Number
                  </label>
                  <Field
                    value={user.phone}
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
                    htmlFor="age"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Age
                  </label>
                  <Field
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter Your Age"
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
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
              </div>

              <div>
                <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
                  Upload Images
                </p>
                <div {...getRootImageProps({ className: "teetag__dropzone " })}>
                  <input {...getInputImageProps()} />
                  {imageFile ? (
                    <p className="text-xl">{imageFile.name}</p>
                  ) : (
                    <p className="text-xl cursor-pointer">
                      Drag & drop or upload{" "}
                      <em className="text-md opacity-40">
                        (Only jpg and png images will be accepted)
                      </em>
                    </p>
                  )}
                </div>
              </div>
              {imageFileError && (
                <p className="label-error mt-6">image is Required</p>
              )}
              <div>
                <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
                  upload document of your story, loss, how it has impacted you,
                  and how the money will help.
                  <span className="text-xl capitalize font-fugaz text-white ml-2">
                    Min: 750 Words
                  </span>
                </p>
                <div
                  {...getRootStoryDocProps({ className: "teetag__dropzone " })}
                >
                  <input {...getInputStoryDocProps()} />
                  {storyFile ? (
                    <p className="text-xl">{storyFile.name}</p>
                  ) : (
                    <p className="text-xl cursor-pointer">
                      Drag & drop or upload{" "}
                      <em className="text-md opacity-40">
                        (Only pdf and doc document will be accepted)
                      </em>
                    </p>
                  )}
                </div>
                {storyFileError && (
                  <p className="label-error mt-6">Story Document Required</p>
                )}
              </div>
              <div>
                <p className="mt-10 mb-6 capitalize h8 font-fugaz text-green-light">
                  upload Documents of documentation/proof of your loss.
                  <span className="text-xl capitalize font-fugaz text-yellow-primary ml-2">
                    (Max: 2 documents)
                  </span>
                </p>
                <div
                  {...getRootLossDocProps({ className: "teetag__dropzone " })}
                >
                  <input {...getInputLossDocProps()} />
                  <p className="text-xl cursor-pointer">
                    Drag & drop or upload
                    <em className="text-md opacity-40">
                      (Only pdf and doc document will be accepted)
                    </em>
                  </p>
                </div>
                <aside className="mt-6">
                  <ul>
                    {lossFile.map((file, index) => (
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
                {lossFileError && (
                  <p className="label-error mt-6">{lossFileError}</p>
                )}
              </div>
              <button className="btn-teetag yellow">Apply</button>
            </Form>
          </Formik>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyScholarship;
