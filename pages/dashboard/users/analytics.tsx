import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import LineGraph from "@/dashboard/components/GraphCard/LineGraph";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import StatusCard from "@/dashboard/components/StatusCard/StatusCard";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { handleStatus } from "@/website/lib/networkCalls/authFunctions";
import {
  getUserAnalytics,
  getUserAnalyticsGraph,
} from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { labels } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useState } from "react";

const UserAnalytics = () => {
  const [months, setMonths] = useState<string>("12");
  const [type, setType] = useState<string>("tags");
  const handleMonthsFilter = (value: string) => {
    setMonths(value.split(" ")[0]);
  };
  const handleTypeFilter = (value: string) => {
    switch (value) {
      case "Tags":
        setType("tags");
        break;
      case "Players":
        setType("players");
        break;
      case "Average Order Size":
        setType("average_order_size");
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
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const dasboardData = getUserAnalytics();
    dasboardData.then((res: any) => {
      const result = res.data.result.analytics;
      const data = [
        {
          id: 1,
          title: "Total Tags",
          amount: null,
          percentage: result.tagsPercentage,
          color: "#00ff00",
          color_name: "green",
          count: result.totalTags,
        },
        {
          id: 2,
          title: "Number of Players",
          amount: null,
          percentage: result.playersPercentage,
          color: "#e03a45",
          color_name: "red",
          count: result.totalPlayers,
        },
        {
          id: 3,
          title: "Average Order Size",
          amount: result.averageOrderSize,
          percentage: result.averageOrderSizePercentage,
          color: "#ffff00",
          color_name: "yellow",
          count: null,
        },
        {
          id: 4,
          title: "Money Raised",
          amount: result.totalRaisedAmount,
          percentage: result.raisedAmountPercentage,
          color: "#00ffcc",
          color_name: "blue",
          count: null,
        },
      ];

      setDashboardData(data);
      setIsLoading(false);
    });
    const response: any = getUserAnalyticsGraph(months, type);
    response
      .then((res) => {
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
      })
      .catch((e) => handleStatus(e));
  }, [type, months]);
  return (
    <>
      {isLoading && <Loader />}
      <TitleHead
        title="User Analytics"
        metaTitle="user analytics"
        metaDesc="users"
      />
      <InnerHeader title="User ANalytics" />
      <div className="mt-8">
        <div className="grid grid-cols-12 gap-8">
          {dashboardData?.map((card) => (
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
          <div className="col-span-12">
            <LineGraph
              chartdata={chartData}
              filterBox={
                <div className="flex justify-between items-center">
                  <FilterBox
                    values={[
                      "Tags",
                      "Players",
                      "Average Order Size",
                      "Money Raised",
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
        </div>
      </div>
    </>
  );
};

export default UserAnalytics;

UserAnalytics.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
