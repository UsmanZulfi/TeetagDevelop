import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import LineGraph from "@/dashboard/components/GraphCard/LineGraph";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import StatusCard from "@/dashboard/components/StatusCard/StatusCard";
import { Loader } from "@/website/components/Loader/Loader";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import {
  getMinionsAnalytics,
  getMinionsAnalyticsGraph,
} from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { labels } from "@/website/lib/types/common";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useState } from "react";

const MinionAnalytics = () => {
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
      case "State Ambassador":
        setType("minions");
        break;
      case "Chains":
        setType("chain");
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
  useEffect(() => {
    setIsLoading(true);
    const dasboardData = getMinionsAnalytics();
    dasboardData.then((res: any) => {
      const result = res.data.result.analytics;
      const data = [
        {
          id: 1,
          title: "Amount Earned",
          amount: result.totalMinionsRaisedAmount,
          percentage: result.minionsRaisedAmountPercentage,
          color: "#e03a45",
          color_name: "red",
          count: null,
        },
        {
          id: 2,
          title: "Total Tags",
          amount: null,
          percentage: result.tagsPercentage,
          color: "#00ff00",
          color_name: "green",
          count: result.totalTags,
        },
        {
          id: 3,
          title: "Number of Chains",
          amount: null,
          percentage: result.chainPercentage,
          color: "#00ffcc",
          color_name: "blue",
          count: result.minionChains,
        },
        {
          id: 4,
          title: "Number of State Ambassadors",
          amount: null,
          percentage: result.minionsCreatedPercentage,
          color: "#ffff00",
          color_name: "yellow",
          count: result.totalMinions,
        },
        {
          id: 5,
          title: "$ Earned Per State Ambassador",
          amount: result.raisedAmountPerMinion,
          percentage: result.raisedAmountPerMinionPercentage,
          color: "#e03a45",
          color_name: "red",
          count: null,
        },
        {
          id: 6,
          title: "Tags Per State Ambassador",
          amount: null,
          percentage: result.tagsPerMinionPercentage,
          color: "#00ffcc",
          color_name: "blue",
          count: result.tagsPerMinion,
        },
        {
          id: 7,
          title: "Chains Per State Ambassador",
          amount: null,
          percentage: result.chainPerMinionPercentage,
          color: "#00ff00",
          color_name: "green",
          count: result.chainPerMinion,
        },
      ];

      setDashboardData(data);
      setIsLoading(false);
    });
    const response: any = getMinionsAnalyticsGraph(months, type);
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
        title="State Ambassador Analytics"
        metaTitle="State Ambassador analytics"
        metaDesc="State Ambassador"
      />
      <InnerHeader title="State Ambassador Analytics" />
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
                      "State Ambassador",
                      "Chains",
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

export default MinionAnalytics;

MinionAnalytics.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
