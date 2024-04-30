import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getScholarship,
  updateScholarshipApplicationStatus,
} from "@/website/lib/networkCalls/dashboard/scholarshipDetails";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ScholarshipReceipientStatus = () => {
  const router = useRouter();
  const { applicationId } = router.query;
  const [applicationData, setapplicationData] = useState<any>({});
  const [status, setStatus] = useState("");

  async function updateStatus() {
    const response = await updateScholarshipApplicationStatus(applicationId, {
      status,
    });
    handleStatus(response);
  }
  useEffect(() => {
    if (applicationId) {
      const response: any = getScholarship(applicationId);
      response.then((response) => {
        setapplicationData(response.data.result.scholarship.user);
        setStatus(
          response.data.result.scholarship.status != "active"
            ? "inactive"
            : "active",
        );
      });
    }
  }, [applicationId]);

  return (
    <>
      <TitleHead
        title="Scholarship Receipient Detail"
        metaTitle="scholarship"
        metaDesc="scholarship"
      />

      <InnerHeader title="Scholarship Receipient Detail" />
      <div className="container">
        <div className="grid gap-10 mt-12 grid-cols-12">
          <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
            <label htmlFor="name" className="block mb-4 capitalize font-fugaz">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              readOnly
              value={applicationData.name}
            />
          </div>
          <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="name" className="block mb-4 capitalize font-fugaz">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              readOnly
              value={applicationData.email}
            />
          </div>
          <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4">
            <label htmlFor="name" className="block mb-4 capitalize font-fugaz">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              readOnly
              value={applicationData.phone}
            />
          </div>

          <div className="teetag__input col-span-12 sm:col-span-7">
            <label
              htmlFor="status"
              className="block mb-4 capitalize font-fugaz"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="w-full border border-gray-400 rounded py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="grid gap-10 mt-12 grid-cols-12">
          <div className="flex justify-center col-span-12 sm:col-span-7 ">
            <button
              type="submit"
              className="btn-teetag yellow w-full text-center"
              onClick={updateStatus}
            >
              Save Change
            </button>
            <button
              type="submit"
              className="btn-teetag green w-full text-center ml-10"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScholarshipReceipientStatus;

ScholarshipReceipientStatus.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
