import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import { sendEmail } from "@/website/lib/networkCalls/dashboard/dashboardFunctions";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import router from "next/router";
import { useState } from "react";

type EmailData = {
  subject: string;
  message: string;
  target?: string;
};

const EmailCampaignPage = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    subject: "",
    message: "",
    target: "",
  });

  const handleSendEmail = async () => {
    const response = await sendEmail(emailData);
    handleStatus(response);
  };

  return (
    <div>
      <TitleHead
        title="Email Campaign"
        metaTitle="Email Campaign"
        metaDesc="Email Campaign"
      />
      <InnerHeader title="Email Campaign" />
      <div className="mt-12">
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1">
            <p className="text-base text-green-light font-fugaz font-normal ">
              Subject
            </p>
            <div className="teetag__input w-full mt-5">
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={(e) =>
                  setEmailData({ ...emailData, subject: e.target.value })
                }
                placeholder="Enter Subject"
              />
            </div>
          </div>
          <div className="col-span-1 ">
            <p className="text-base text-green-light font-fugaz font-normal ">
              Select User Type
            </p>
            <div className="teetag__input w-full mt-5">
              <select
                className="w-full"
                name="userType"
                placeholder="Select User type"
                value={emailData.target}
                onChange={(e) =>
                  setEmailData({ ...emailData, target: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="users">Users</option>
                <option value="influencers">Influencers</option>
                <option value="minions">State Ambassadors</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <p className="text-base text-green-light font-fugaz font-normal">
          Body
        </p>
        <div className="teetag__textarea w-full mt-5">
          <textarea
            name="message"
            value={emailData.message}
            onChange={(e) =>
              setEmailData({ ...emailData, message: e.target.value })
            }
            placeholder="Enter Email Message"
          />
        </div>
      </div>
      <div className="mt-10">
        <button onClick={handleSendEmail} className="btn-teetag yellow w-96">
          Send
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="btn-teetag green ml-20 w-96"
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default EmailCampaignPage;

EmailCampaignPage.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
