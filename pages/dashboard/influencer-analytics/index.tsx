import DashboardTitleHead from "@/dashboard/components/DashboardTitleHead/DashboardTitleHead";
import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import LineGraph from "@/dashboard/components/GraphCard/LineGraph";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import StatusCard from "@/dashboard/components/StatusCard/StatusCard";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import {
  getDashboard,
  getInfluencerDashboardAnalyticsGraph,
} from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { labels } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useState } from "react";

const InfluencerAnalytics = () => {
  const [dashboardData, setDashboardData] = useState([]);
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
      case "Average Order Size":
        setType("average_order_size");
        break;
      case "Chains":
        setType("chains");
        break;
      case "Money Raised":
        setType("raised_amount");
        break;
      default:
        setType("tags");
        break;
    }
  };

  const [chartData, setChartData] = useState<any>([]);
  useEffect(() => {
    setIsLoading(true);
    const dasboardData = getDashboard();
    dasboardData.then((res: any) => {
      const result = res.data.result;
      const influencerData = [
        {
          id: 1,
          title: "total tags",
          percentage: result.tagsPercentage,
          color: "#ffff00",
          color_name: "yellow",
          count: result.totalTags,
        },
        {
          id: 2,
          title: "Number of Chains",
          percentage: result.chainsPercentage,
          color: "#00ff00",
          color_name: "green",
          count: result.totalChains,
        },
        {
          id: 3,
          title: "total Earnings",
          amount: result.totalEarnings,
          percentage: result.earningsPercentage,
          color: "#ffff00",
          color_name: "yellow",
        },
        {
          id: 4,
          title: "Earned this month",
          amount: result.earningThisMonth,
          percentage: result.monthEarningPercentage,
          color: "#00ffcc",
          color_name: "blue",
        },
      ];
      setDashboardData(influencerData);
    });
  }, []);
  useEffect(() => {
    const response: any = getInfluencerDashboardAnalyticsGraph(months, type);
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
        title="Influencer Analytics"
        metaTitle="Influencer Analytics"
        metaDesc="Influencer Analytics"
      />
      <InnerHeader title="Influencer Analytics" />
      <DashboardTitleHead
        name={getUserInfo().name}
        state={getUserInfo().state}
      />
      <div className="my-8 grid grid-cols-12 gap-8">
        {dashboardData.map((card) => (
          <StatusCard
            key={card.id}
            title={card.title}
            amount={card.amount}
            count={card.count}
            percentage={card.percentage}
            color={card.color}
            color_name={card.color_name}
            id={card.id}
          />
        ))}
      </div>
      <div className="col-span-12">
        <LineGraph
          chartdata={chartData}
          filterBox={
            <div className="flex justify-between items-center">
              <FilterBox
                values={[
                  "Tags",
                  "Chains",
                  "Money Raised",
                  "Average Order Size",
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

export default InfluencerAnalytics;

InfluencerAnalytics.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
