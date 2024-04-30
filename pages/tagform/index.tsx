import { Footer } from "@/website/components/Footer/Footer";
import { Header } from "@/website/components/Header/Header";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import { createTagee } from "@/website/lib/networkCalls/formFunctions";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import Image from "next/image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./tagform.module.css";

interface TagFormProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  color: string;
}

const sizes = [
  {
    id: 1,
    name: "M",
  },
  {
    id: 2,
    name: "L",
  },
  {
    id: 3,
    name: "XL",
  },
  {
    id: 4,
    name: "2XL",
  },
];

const plates = [
  {
    id: 1,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682730690.png",
  },
  {
    id: 2,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682730920.png",
  },
  {
    id: 3,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682730921.png",
  },
  {
    id: 4,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682731152.png",
  },
  {
    id: 5,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682731153.png",
  },
  {
    id: 6,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682731154.png",
  },
  {
    id: 7,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682731155.png",
  },
  {
    id: 8,
    url: "https://teetag-app-documents.s3.amazonaws.com/images/1680682731388.png",
  },
];

const validate = (values: TagFormProps) => {
  const errors: FormikValues = {};

  if (!values.name) {
    errors.name = "Name is Required";
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

  if (!values.city) {
    errors.city = "City is Required";
  }

  if (!values.address) {
    errors.address = "Address is Required";
  }

  if (!values.state) {
    errors.state = "State is Required";
  }

  if (!values.postalCode) {
    errors.postalCode = "Postal Code is Required";
  }

  if (!values.color) {
    errors.color = "Color is Required";
  }

  return errors;
};

const TagForm = () => {
  const [active, setActive] = useState<number>(-1);
  const [plateActive, setPlateActive] = useState<number>(-1);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [plate, setPlate] = useState<string | null>(null);
  const [plateError, setPlateError] = useState<string | null>(null);
  const initialValues: TagFormProps = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    color: "",
  };

  function handleClick(
    e: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) {
    setActive(index);
  }
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSize(value);
      setSizeError(null);
    }
  };

  const handlePlateClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    index: number,
  ) => {
    setPlateActive(index);
  };

  const handlePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setPlate(value);
      setPlateError(null);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TitleHead
        title="Sign up to be tagged"
        metaTitle="Sign up to be tagged"
        metaDesc=""
      />
      <section className="tagform-hero">
        <Header />
        <div className="story-content">
          <div className="container">
            <h1 className="text-center uppercase h1 font-fugaz shadow-heading">
              Signup to be tagged
            </h1>
            <p className="mt-4 text-center h8 capitalize">
              I created the Jack Bradley Project because I wanted to create
              something fun and cool for a great cause. This project holds
              special value in my heart. Due to my past.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(false);
              size ?? setSizeError("Size is Required");
              plate ?? setPlateError("Plate is Required");
              if (size && plate) {
                const response = await createTagee({
                  address: values.address,
                  city: values.city,
                  email: values.email,
                  name: values.name,
                  phone: "+1" + values.phone,
                  plate_design: plate,
                  postal_code: values.postalCode,
                  shirt_color: values.color,
                  shirt_size: size,
                  state: values.state,
                });
                handleStatus(response);
              }
            }}
          >
            <Form>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
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
                    htmlFor="address"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Your Address"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="city"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter Your City"
                  />
                  <ErrorMessage
                    name="city"
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
                    htmlFor="postalCode"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Postal Code
                  </label>
                  <Field
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Enter Your Postal Code"
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div className="teetag__input">
                  <label
                    htmlFor="color"
                    className="block mb-4 capitalize font-fugaz"
                  >
                    Shirt Color
                  </label>
                  <Field as="select" name="color" id="color">
                    <option value="">Select</option>
                    <option value="AL">Red</option>
                    <option value="AK">Green</option>
                    <option value="AZ">Blue</option>
                  </Field>
                  <ErrorMessage
                    name="color"
                    component="p"
                    className="label-error mt-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor="size"
                    className="h8 text-green-light block mb-4 capitalize font-fugaz"
                  >
                    Size
                  </label>
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-8 xl:gap-12 2xl:gap-14 variation_flex">
                    {sizes.map((size) => (
                      <label
                        htmlFor={size.name}
                        key={size.id}
                        className={
                          `font-fugaz ${active === size.id ? " active " : ""}` +
                          styles.contribution__checkbox
                        }
                        onClick={(e) => handleClick(e, size.id)}
                      >
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          name={size.name}
                          id={size.name}
                          value={size.name}
                          checked={active === size.id ? true : false}
                          onChange={handleCheckboxChange}
                        />
                        {size.name}
                      </label>
                    ))}
                  </div>
                  {!size ? (
                    <p className="label-error mt-6">{sizeError}</p>
                  ) : null}
                </div>
              </div>
              <div className="mt-10">
                <label
                  htmlFor="state"
                  className="h8 text-green-light block mb-4 capitalize font-fugaz"
                >
                  Choose Plate Design
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {plates.map((plate) => (
                  <div
                    key={plate.id}
                    onClick={(e) => handlePlateClick(e, plate.id)}
                    className={
                      `font-fugaz plate  ${
                        plateActive === plate.id ? " active " : ""
                      }` + styles.contribution__plate
                    }
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      name={plate.url}
                      id={plate.url}
                      value={plate.url}
                      checked={plateActive === plate.id ? true : false}
                      onChange={handlePlateChange}
                    />
                    <Image
                      src={plate.url}
                      alt="banner-icon"
                      width={210}
                      height={140}
                    />
                  </div>
                ))}
                {!plate ? (
                  <p className="label-error mt-6">{plateError}</p>
                ) : null}
              </div>
              <button type="submit" className="btn-teetag yellow">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TagForm;
