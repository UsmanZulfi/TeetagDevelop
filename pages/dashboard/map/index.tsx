import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import dynamic from "next/dynamic";
const Maps = dynamic(() => import("@/website/components/Maps/Maps"), {
  ssr: false,
});
const Map = () => {
  return (
    <>
      <TitleHead title="Map" metaTitle="map" metaDesc="map" />
      <InnerHeader title="Map" />
      <Maps />
      <div className="grid gap-10 mt-12 grid-cols-12">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 mr-12"></div>
      </div>
    </>
  );
};

export default Map;

Map.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
