import { ErrorMessage, Field } from "formik";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface TagFormProps {
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
}
const TagForm = ({ isDisabled, setIsDisabled }: TagFormProps) => {
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between mt-12 xl:items-center xl:flex-row">
        <h3 className="flex-1 my-16 uppercase h4 font-fugaz text-yellow-primary">
          tag/Shipping Details
        </h3>
        <div className="flex items-start gap-6 teetag-checkbox">
          <Field
            className="flex-shrink-0"
            type="checkbox"
            name="shirtForSelf"
            id="shirtForSelf"
            checked={isDisabled}
            onChange={() => setIsDisabled(!isDisabled)}
          />

          <label htmlFor="shirtForSelf">This shirt is for myself</label>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-12 lg:grid-cols-2 ${
          isDisabled ? "opacity-50" : ""
        }`}
      >
        <div className="teetag__input">
          <label htmlFor="tagName" className="block mb-4 capitalize font-fugaz">
            Name
          </label>
          <Field
            type="text"
            name="tagName"
            id="tagName"
            placeholder="Enter Your Name"
            disabled={isDisabled}
          />
          {!isDisabled ? (
            <ErrorMessage
              name="tagName"
              component="p"
              className="label-error mt-6"
            />
          ) : null}
        </div>
        <div className="teetag__input">
          <label
            htmlFor="tagEmail"
            className="block mb-4 capitalize font-fugaz"
          >
            Email
          </label>
          <Field
            type="email"
            name="tagEmail"
            id="tagEmail"
            placeholder="Enter Your Email"
            disabled={isDisabled}
          />
          <ErrorMessage
            name="tagEmail"
            component="p"
            className="label-error mt-6"
          />
        </div>
        <div className="teetag__input">
          <label
            htmlFor="tagAddress"
            className="block mb-4 capitalize font-fugaz"
          >
            Address
          </label>
          <Field
            type="text"
            name="tagAddress"
            id="tagAddress"
            placeholder="Enter Your Address"
            disabled={isDisabled}
          />
          <ErrorMessage
            name="tagAddress"
            component="p"
            className="label-error mt-6"
          />
        </div>
        <div className="teetag__input">
          <label
            htmlFor="tagPhone"
            className="block mb-4 capitalize font-fugaz"
          >
            Phone
          </label>
          <Field
            type="text"
            name="tagPhone"
            id="tagPhone"
            placeholder="Enter Your Phone"
            disabled={isDisabled}
          />
          <ErrorMessage
            name="tagPhone"
            component="p"
            className="label-error mt-6"
          />
        </div>
        <div className="teetag__input">
          <label
            htmlFor="tagState"
            className="block mb-4 capitalize font-fugaz"
          >
            State
          </label>
          <Field
            as="select"
            name="tagState"
            id="tagState"
            disabled={isDisabled}
          >
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
            name="tagState"
            component="p"
            className="label-error mt-6"
          />
        </div>
        <div className="teetag__input">
          <label htmlFor="tagCity" className="block mb-4 capitalize font-fugaz">
            City
          </label>
          <Field
            type="text"
            name="tagCity"
            id="tagCity"
            placeholder="Enter Your City"
            disabled={isDisabled}
          />
          <ErrorMessage
            name="tagCity"
            component="p"
            className="label-error mt-6"
          />
        </div>
        <div className="teetag__input">
          <label
            htmlFor="tagPostalCode"
            className="block mb-4 capitalize font-fugaz"
          >
            Postal Code
          </label>
          <Field
            type="text"
            name="tagPostalCode"
            id="tagPostalCode"
            placeholder="Enter Your Postal Code"
            disabled={isDisabled}
          />
          <ErrorMessage
            name="tagPostalCode"
            component="p"
            className="label-error mt-6"
          />
        </div>
      </div>
      <div className="flex justify-center sm:justify-start">
        <Link href="/play-now" className="btn-teetag yellow">
          Continue to shopping
        </Link>
      </div>
    </>
  );
};

export default TagForm;
