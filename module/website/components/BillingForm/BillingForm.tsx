import { ErrorMessage, Field } from "formik";

const BillingForm = () => {
  return (
    <>
      <h3 className="mb-16 uppercase h4 font-fugaz text-yellow-primary">
        Billing Details
      </h3>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="teetag__input">
          <label htmlFor="name" className="block mb-4 capitalize font-fugaz">
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
          <label htmlFor="phone" className="block mb-4 capitalize font-fugaz">
            Phone
          </label>
          <Field
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone"
            readOnly
          />
        </div>
        <div className="teetag__input">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Email
          </label>
          <Field
            type="email"
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
        <div className="teetag__input">
          <label htmlFor="address" className="block mb-4 capitalize font-fugaz">
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
          <label htmlFor="city" className="block mb-4 capitalize font-fugaz">
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
          <label htmlFor="state" className="block mb-4 capitalize font-fugaz">
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
      </div>
    </>
  );
};

export default BillingForm;
