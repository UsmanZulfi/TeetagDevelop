import GraphCard from "@/dashboard/components/GraphCard/GraphCard";
import StatusCard from "@/dashboard/components/StatusCard/StatusCard";
import StatusListCard from "@/dashboard/components/StatusListCard/StatusListCard";
import { Loader } from "@/website/components/Loader/Loader";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import { getDashboard } from "@/website/lib/networkCalls/dashboard/dashboardAnalytics";
import { useEffect, useState } from "react";

const AdminDashboardWrapper = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [recentContributions, setRecentContributions] = useState([]);
  const [recentTags, setRecentTags] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const role = getUserInfo()?.role;
    setIsLoading(true);
    const dasboardData = getDashboard();
    dasboardData.then((res: any) => {
      const result = res.data.result;
  
      const data = [
        {
          id: 1,
          title: "revenue",
          amount: result.totalRevenue,
          percentage: result.revenuePercentage,
          color: "#00ff00",
          color_name: "green",
          count: null,
        },
        {
          id: 2,
          title: "expenses",
          amount: result.totalExpense,
          percentage: result.expensePercentage,
          color: "#e03a45",
          color_name: "red",
          count: null,
        },
        {
          id: 3,
          title: "$ to recipients",
          amount: result.allRecipientRaisedMoney,
          percentage: result.raisedMoneyPercentage,
          color: "#ffff00",
          color_name: "yellow",
          count: null,
        },
        {
          id: 4,
          title: "$ to State Ambassador",
          amount: result.allMinionRaisedMoney,
          percentage: result.minionRaisedMoneyPercentage,
          color: "#00ffcc",
          color_name: "blue",
          count: null,
        },
        {
          id: 5,
          title: "$ to influencer",
          amount: result.allInfluencersRaisedMoney,
          count: null,
          percentage: result.influencersRaisedMoneyPercentage,
          color: "#ffff00",
          color_name: "yellow",
        },
        {
          id: 6,
          title: "gross profit",
          amount: result.grossProfit,
          count: null,
          percentage: result.grossProfitPercentage,
          color: "#00ffcc",
          color_name: "blue",
        },
        {
          id: 7,
          title: "total tags",
          amount: null,
          count: result.totalTags,
          percentage: result.tagsPercentage,
          color: "#00ff00",
          color_name: "green",
        },
        {
          id: 8,
          title: "number of players",
          amount: null,
          count: result.totalPlayers,
          percentage: result.playersPercentage,
          color: "#e03a45",
          color_name: "red",
        },
      ];
      setDashboardData(data);
      if (role == "admin") {
        const recentContributions = result.recentThreeContributions.map(
          (item: any) => {
            return {
              name: item.recipientName || "Jack",
              date: item.createdAt.split("T")[0],
              amount: `$${item.amount}`,
            };
          },
        );
        setRecentContributions(recentContributions);
        const recentTags = result.recentThreeTags.map((item: any) => {
          return {
            name: item?.billing?.name || "Jack",
            date: item.createdAt.split("T")[0],
            amount: `$${item.amount}`,
            state: item.tagee_state,
          };
        });
        setRecentTags(recentTags);
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
          <div className="col-span-12">
            <GraphCard />
            <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <StatusListCard
                title="Recent Contributions"
                data={recentContributions}
              />
              <StatusListCard
                title="Latest Tags/Transactions"
                data={recentTags}
              />
              <StatusListCard
                title="Traffic Source"
                data={[
                  {
                    name: "Social Media Redirection",
                    percentage: "65%",
                  },
                  {
                    name: "Google Ads",
                    percentage: "15%",
                  },
                  {
                    name: "http://www.example.com/1234",
                    percentage: "20%",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardWrapper;
