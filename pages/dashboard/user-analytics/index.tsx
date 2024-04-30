import DashboardTitleHead from "@/dashboard/components/DashboardTitleHead/DashboardTitleHead";
import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import LineGraph from "@/dashboard/components/GraphCard/LineGraph";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import AnalyticsCardWrapper from "@/dashboard/containers/DashboardWrapper/AnalyticsCardWrapper";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import { getUserDashboardAnalyticsGraph } from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { labels } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useState } from "react";

const UserAnalytics = () => {
  const [months, setMonths] = useState<string>("12");
  const [type, setType] = useState<string>("tags");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleMonthsFilter = (value: string) => {
    setMonths(value.split(" ")[0]);
  };
  const handleTypeFilter = (value: string) => {
    switch (value) {
      case "Tags":
        setType("tags");
        break;
      case "States Reached":
        setType("states");
        break;
      case "Chains":
        setType("chains");
        break;
      case "Money Raised":
        setType("raised_money");
        break;
      case "Personal Raised Money":
        setType("personal_raised_money");
        break;
      default:
        setType("tags");
        break;
    }
  };

  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const response: any = getUserDashboardAnalyticsGraph(months, type);
    response.then((res) => {
      res = res.data.result;
      const previousMonths = res.map((item) => {
        return labels[item.month - 1];
      });
      const data = {
        labels: previousMonths,
        datasets: [
          {
            label: type.replaceAll("_", " "),
            data: res?.map((item) => item.total),
            backgroundColor: "#00ff00",
            borderWidth: 6,
            fill: true,
          },
        ],
      };
      setChartData(data);
      setIsLoading(false);
    });
  }, [type, months]);

  return (
    <>
      {isLoading && <Loader />}
      <TitleHead
        title="User Analytics"
        metaTitle="User Analytics"
        metaDesc="User Analytics"
      />
      <InnerHeader title="User Analytics" />
      <DashboardTitleHead
        name={getUserInfo()?.name}
        state={getUserInfo()?.state}
      />

      <AnalyticsCardWrapper />
      <div className="col-span-12 mt-10">
        <LineGraph
          chartdata={chartData}
          filterBox={
            <div className="flex justify-between items-center">
              <FilterBox
                values={[
                  "Tags",
                  "States Reached",
                  "Chains",
                  "Money Raised",
                  "Personal Raised Money",
                ]}
                onChange={handleTypeFilter}
              />
              <FilterBox
                values={["1 month", "6 months", "12 months"]}
                onChange={handleMonthsFilter}
              />
            </div>
          }
        />
      </div>
    </>
  );
};

export default UserAnalytics;

UserAnalytics.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
