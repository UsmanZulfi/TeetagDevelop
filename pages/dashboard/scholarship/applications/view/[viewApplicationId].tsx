import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getRequestedApplication,
  rejectApplication,
} from "@/website/lib/networkCalls/dashboard/scholarshipDetails";
import { getAWSSignedUrl } from "@/website/lib/networkCalls/dashboard/userDetails";
import { stateOptions } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import uuid from "react-uuid";

interface ScholarshipReceipientDetailProps {
  application: any;
}

interface IParams extends ParsedUrlQuery {
  viewApplicationId: string;
}

const ScholarshipApplicantDetail = ({
  application,
}: ScholarshipReceipientDetailProps) => {
  const router = useRouter();
  const { viewApplicationId } = router.query as IParams;
  async function handleRejectApplication(viewApplicationId: string) {
    const response = await rejectApplication(viewApplicationId);
    handleStatus(response);
    if (response.status === 200) {
      router.push("/dashboard/scholarship");
    }
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
        title="Scholarship Receipient Detail"
        metaTitle="scholarship"
        metaDesc="scholarship"
      />

      <InnerHeader title="Scholarship Receipient Detail" />
      <div className="container">
        <div className="grid grid-cols-3 mt-10  gap-12">
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">Name</p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {application?.user?.name}
            </p>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">Email</p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {application?.user?.email}
            </p>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">
              Phone Number
            </p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {application?.user?.phone}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-20  gap-12">
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">State</p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {
                stateOptions.find(
                  (state) => state.value === application?.user?.state,
                )?.label
              }
            </p>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">Age</p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {application?.user?.age}
            </p>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">Loss</p>
            <p className="text-lg font-semibold text-green-light mt-3">
              {application?.reason}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-20 gap-12">
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">Image</p>
            <a
              className="text-lg font-semibold text-green-light mt-3 break-words cursor-pointer"
              onClick={() => getSignedUrl(application?.image)}
            >
              {application?.image || "No Image"}
            </a>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">
              Story Document
            </p>
            <a
              className="text-lg font-semibold text-green-light mt-3 break-words cursor-pointer"
              onClick={() => getSignedUrl(application?.documents[0])}
            >
              {application?.documents[0]}
            </a>
          </div>
          <div className="col-span-1 flex flex-col">
            <p className="text-xl font-bold text-yellow-primary">
              Proof Documents
            </p>
            {application?.proof_documents?.map((document: any) => (
              <a
                key={uuid()}
                className="text-lg font-semibold text-green-light mt-3 break-words cursor-pointer"
                onClick={() => getSignedUrl(document)}
              >
                {document}
              </a>
            ))}
          </div>
        </div>
        <div className="flex justify-start gap-4 mt-20">
          <Link
            href={`/dashboard/scholarship/applications/edit/${viewApplicationId}`}
          >
            <button className="btn-teetag yellow">Approve</button>
          </Link>

          <button
            className="btn-teetag green ml-10"
            onClick={() => handleRejectApplication(viewApplicationId)}
          >
            Reject
          </button>
        </div>
      </div>
    </>
  );
};

export default ScholarshipApplicantDetail;

ScholarshipApplicantDetail.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { viewApplicationId } = context.params as IParams;
  try {
    const application = await getRequestedApplication(viewApplicationId);
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
