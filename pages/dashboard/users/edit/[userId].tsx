import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getUserInfo,
  updateUser,
} from "@/website/lib/networkCalls/dashboard/userDetails";
import { stateOptions } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

interface IParams extends ParsedUrlQuery {
  userId: string;
}

interface UserInfoProps {
  user: User;
}

const EditUser = ({ user }: UserInfoProps) => {
  const [formValues, setformValues] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    state: stateOptions.find((s) => s.label == user?.state)?.value,
  });
  function handleChange(e: any): void {
    e.target.value;
    setformValues({
      name: e.target.name == "name" ? e.target.value : formValues.name,
      email: e.target.name == "email" ? e.target.value : formValues.email,
      phone: e.target.name == "phone" ? e.target.value : formValues.phone,
      state:
        e.target.name == "state"
          ? stateOptions.find((item) => item.value == e.target.value).label
          : formValues.state,
    });
  }
  function updateData() {
    const updatedData = {
      name: formValues.name,
      state: stateOptions.find((item) => item.label == formValues.state).value,
    };
    const response: any = updateUser(user.id, updatedData);
    response.then((res) => {
      console.log(res);
      handleStatus(res);
    });
  }

  return (
    <>
      <TitleHead title="User Info" metaTitle="user info" metaDesc="users" />
      <InnerHeader title="Edit User" />
      <div className="grid gap-10 mt-12 grid-cols-12">
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="email"
            placeholder="Enter Name here"
            defaultValue={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formValues.email}
            disabled={true}
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="email"
            placeholder="Enter Phone"
            value={formValues.phone}
            disabled={true}
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            State
          </label>
          <select
            name="state"
            id="state"
            defaultValue={user?.state}
            onChange={handleChange}
          >
            {stateOptions.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-12 mt-12 grid-cols-12">
        <button
          type="submit"
          className="btn-teetag yellow text-center col-span-12 sm:col-span-6 lg:col-span-3"
          onClick={() => {
            updateData();
          }}
        >
          Save
        </button>
        <button
          type="submit"
          className="btn-teetag green text-center col-span-12 sm:col-span-6 lg:col-span-3"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditUser;

EditUser.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as IParams;
  try {
    const user = await getUserInfo(userId);
    return {
      props: {
        user: user.data.result,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
