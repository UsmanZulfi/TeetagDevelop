import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import AdminDashboardWrapper from "@/dashboard/containers/DashboardWrapper/AdminDashboardWrapper";
import DashboardWrapper from "@/dashboard/containers/DashboardWrapper/DashboardWrapper";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";

import DashboardLayout from "module/dashboard/layout/DashboardLayout";

const Dashboard = () => {
  const role = getUserInfo()?.role;
  return (
    <>
      <TitleHead title="Dashboard" metaTitle="dashboard" metaDesc="dashboard" />
      <InnerHeader title="dashboard" />
      {(role == "admin" && <AdminDashboardWrapper />) || <DashboardWrapper />}
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
