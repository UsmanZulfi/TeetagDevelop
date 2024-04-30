import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import {
  getSettingsData,
  updateSettingsData,
} from "@/website/lib/networkCalls/dashboard/dashboardFunctions";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [settingsData, setSettingsData] = useState<any>(null);

  useEffect(() => {
    const settingsData = getSettingsData();
    settingsData.then((res: any) => {
      setSettingsData(res.result.data);
    });
  }, []);

  const updateSettings = async () => {
    const response = await updateSettingsData(settingsData);
    if (response.status == 200) {
      toast.success("Settings updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  function handleChange(e: any) {
    const { name, value } = e.target;

    if (name === "S" || name === "M" || name === "L" || name === "XL") {
      setSettingsData((prevState) => ({
        ...prevState,
        shirt_cost: {
          ...prevState.shirt_cost,
          [name]: parseFloat(value),
        },
      }));
    } else {
      setSettingsData((prevState) => ({
        ...prevState,
        [name]: parseFloat(value),
      }));
    }
    settingsData;
  }

  return (
    <div>
      <TitleHead title="Settings" metaTitle="Settings" metaDesc="Settings" />
      <InnerHeader title="Settings" />
      <div className="mt-12 ml-20">
        <p className="text-lg text-green-light font-fugaz mb-10">
          Sizes & Pricing
        </p>
        <div className="grid grid-cols-10 gap-5 mt-4">
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Small
            </p>
            <div className="teetag__input w-48">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.shirt_cost.S}
                name="S"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Medium
            </p>
            <div className="teetag__input w-48">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.shirt_cost.M}
                name="M"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Large
            </p>
            <div className="teetag__input w-48">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.shirt_cost.L}
                name="L"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              XL
            </p>
            <div className="teetag__input w-48">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.shirt_cost.XL}
                name="XL"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              XXL
            </p>
            <div className="teetag__input w-48">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.shirt_cost["2XL"]}
                name="2XL"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <p className="text-lg text-green-light font-fugaz mb-10 mt-20">
          Shipping Cost
        </p>
        <div className="grid grid-cols-12 gap-5 mt-4">
          <div className="col-span-2 flex items-center">
            <p className=" text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              First Shipping
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="teetag__input ">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.base_shipping_cost}
                name="base_shipping_cost"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Each Shipping
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="teetag__input">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.step_in_shipping_cost}
                name="step_in_shipping_cost"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 mt-12">
          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Actual Cost
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="teetag__input">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.real_shipping_cost}
                name="real_shipping_cost"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-span-2 flex items-center">
            <p className="text-base text-yellow-primary font-fugaz font-normal uppercase mr-5">
              Actual Cost (Each)
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="teetag__input">
              <input
                type="number"
                placeholder="Price"
                defaultValue={settingsData?.real_shipping_cost_step}
                name="real_shipping_cost_step"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button className="btn-teetag yellow" onClick={updateSettings}>
            Update
          </button>
          <button
            className="btn-teetag green ml-20"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

SettingsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
