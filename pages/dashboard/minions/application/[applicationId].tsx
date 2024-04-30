import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  approveMinion,
  getAWSSignedUrl,
  getAllApplications,
  getApplication,
  rejectMinion,
} from "@/website/lib/networkCalls/dashboard/userDetails";

import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface IParams extends ParsedUrlQuery {
  applicationId: string;
}

interface minionInfoProps {
  application: any;
}

const Application = ({ application }: minionInfoProps) => {
  const [applicationData, setapplicationData] = useState({
    name: application?.user.name,
    email: application?.user.email,
    phone: application?.user.phone,
    state: application?.user.state,
    age: application?.user.age,
    loss: application?.reason,
    story: application?.story,
    image: application?.image,
    documents: application?.documents,
    proof_documents: application?.proof_documents,
    status: application?.status,
  });
  const [minionCode, setMinionCode] = useState("");

  async function approveApplication(e: any) {
    e.preventDefault();
    if (!minionCode.trim()) {
      toast.error("Please enter State Ambassador code");
      return;
    }
    const response = await approveMinion(application.id, minionCode);
    handleStatus(response);
    setapplicationData({ ...applicationData, status: "approved" });
  }

  async function rejectApplication() {
    const response = await rejectMinion(application.id);
    handleStatus(response);
    setapplicationData({ ...applicationData, status: "rejected" });
  }

  async function getSignedUrl(docUrl) {
    const response = await getAWSSignedUrl(docUrl);
    const signedUrl = response.data.result.url;
    window.open(signedUrl, "_blank");
    return;
  }

  return (
    <>
      <TitleHead
        title="Application"
        metaTitle="Application"
        metaDesc="Applications"
      />
      <InnerHeader title="View Application" />
      <div className="grid gap-10 mt-12 grid-cols-12">
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name here"
            defaultValue={applicationData.name}
            readOnly
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
            value={applicationData.email}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Phone"
            value={applicationData.phone}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            placeholder="Enter State"
            defaultValue={applicationData.state}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            placeholder="Enter Age"
            defaultValue={applicationData.age}
            readOnly
          />
        </div>
        <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-4 mr-12">
          <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
            Loss
          </label>
          <input
            type="text"
            name="loss"
            id="loss"
            placeholder="Enter Loss"
            defaultValue={applicationData.loss}
            readOnly
          />
        </div>
        <div className="teetag__textarea col-span-12 mr-12">
          <label htmlFor="story" className="block mb-4 capitalize font-fugaz">
            Story
          </label>
          <textarea
            name="story"
            id="story"
            placeholder="Enter Story"
            defaultValue={applicationData.story}
            readOnly
          />
        </div>
        <div className="teetag__textarea col-span-12 mr-12">
          <label
            htmlFor="Documents"
            className="block mb-4 capitalize font-fugaz"
          >
            Documents
          </label>
          <div>
            <a
              onClick={() => {
                getSignedUrl(applicationData?.image);
              }}
              className="text-sm sm:text-lg text-green-dark cursor-pointer block"
            >
              {applicationData?.image}
            </a>
          </div>
          {(applicationData.documents || [])
            .concat(applicationData.proof_documents || [])
            .map((doc: any) => {
              return (
                <div key={doc}>
                  <a
                    className="text-sm text-green-dark cursor-pointer block"
                    onClick={() => {
                      getSignedUrl(doc);
                    }}
                  >
                    {doc}
                  </a>
                </div>
              );
            })}
          {(!applicationData.documents || !applicationData.documents.length) &&
            (!applicationData.proof_documents ||
              !applicationData.proof_documents.length) && (
              <p className="text-sm text-green-dark">No documents</p>
            )}
        </div>
      </div>
      {applicationData.status == "pending" && (
        <form onSubmit={approveApplication}>
          <div className="teetag__input col-span-12 sm:col-span-6 lg:col-span-2 mr-12 mt-10">
            <label htmlFor="email" className="block mb-4 capitalize font-fugaz">
              State Ambassador Code
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter State Ambassador Code here"
              onChange={(e) => setMinionCode(e.target.value)}
            />
          </div>
        </form>
      )}

      {(applicationData.status == "pending" && (
        <div className="grid gap-12 mt-12 grid-cols-12">
          <button
            type="submit"
            className="btn-teetag yellow text-center col-span-12 sm:col-span-6 lg:col-span-3"
            onClick={approveApplication}
          >
            Approve
          </button>
          <button
            type="submit"
            className="btn-teetag redblack text-center col-span-12 sm:col-span-6 lg:col-span-3"
            onClick={rejectApplication}
          >
            Reject
          </button>
          <button
            type="submit"
            className="btn-teetag green text-center col-span-12 sm:col-span-6 lg:col-span-3"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      )) || (
        <h6 className="mt-8 text-center text-xl">Application is not Pending</h6>
      )}
    </>
  );
};

export default Application;

Application.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const applications: any = await getAllApplications();
  const paths = applications?.result?.applications.map((category) => {
    return {
      params: {
        applicationId: `${category.id}`,
      },
    };
  });
  return {
    paths: paths || [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
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
