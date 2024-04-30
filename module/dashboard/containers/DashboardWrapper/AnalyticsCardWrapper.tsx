import StatusCard from "@/dashboard/components/StatusCard/StatusCard";
import { Loader } from "@/website/components/Loader/Loader";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import { getDashboard } from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { useEffect, useState } from "react";

const AnalyticsCardWrapper = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const role = getUserInfo()?.role;
    if (role == "scholarshipRecipient") return;
    const dasboardData = getDashboard();
    dasboardData.then((res: any) => {
      const result = res.data.result;

      if (role == "user") {
        const userData = [
          {
            id: 1,
            title: "total tags",
            percentage: result.tags_percentage,
            color: "#ffff00",
            color_name: "yellow",
            count: result.totalTags,
          },
          {
            id: 2,
            title: "tags in my chain",
            percentage: result.chainsPercentage,
            color: "#00ff00",
            color_name: "green",
            count: result.totalChains,
          },
          {
            id: 3,
            title: "dollars raised",
            amount: result.personalRaisedMoney,
            percentage: result.percentagePersonalRaisedAmount,
            color: "#e03a45",
            color_name: "red",
          },
          {
            id: 4,
            title: "# of States reached",
            count: result.totalStates,
            percentage: result.statesPercentage,
            color: "#00ffcc",
            color_name: "blue",
          },
        ];
        setDashboardData(userData);
      } else if (role == "minion") {
        const minionData = [
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
            percentage: result.numberOfChainsPercentage,
            color: "#00ff00",
            color_name: "green",
            count: result.numberOfChains,
          },
          {
            id: 3,
            title: "total Earnings",
            amount: result.totalRaisedMoney,
            percentage: result.raisedMoneyPercentage,
            color: "#ffff00",
            color_name: "yellow",
          },
          {
            id: 4,
            title: "Earned this month",
            amount: result.totalRaisedMoneyInLast30Days,
            percentage: result.raisedInLast30DaysPercentage,
            color: "#00ffcc",
            color_name: "blue",
          },
        ];
        setDashboardData(minionData);
      } else if (role == "influencer") {
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
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading && <Loader />}
      <div className="mt-8">
        <div className="grid grid-cols-12 gap-8">
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
      </div>
    </>
  );
};

export default AnalyticsCardWrapper;
