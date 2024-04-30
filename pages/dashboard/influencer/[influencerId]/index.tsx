import DataDetailCard from "@/dashboard/components/DataDetailCard/DataDetailCard";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { Influencer } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getInfluencerInfo } from "@/website/lib/networkCalls/dashboard/userDetails";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMemo, useState } from "react";
interface IParams extends ParsedUrlQuery {
  influencerId: string;
}

interface influencerInfoProps {
  influencer: Influencer;
}

const InfluencerInfo = ({ influencer }: influencerInfoProps) => {
  const cols = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Order ID",
        cell: (row) => row.renderValue(),
        accessorKey: "order_id",
      },
      {
        header: "Tagger",
        cell: (row) => row.renderValue(),
        accessorKey: "shipping.name",
      },
      {
        header: "State of tagger",
        cell: (row) => row.renderValue(),
        accessorKey: "tager_state",
      },
      {
        header: "Person Tagged",
        cell: (row) => row.renderValue(),
        accessorKey: "billing.name",
      },
      {
        header: "State of Person tagged",
        cell: (row) => row.renderValue(),
        accessorKey: "tagee_state",
      },
      {
        header: "Shirts in Order",
        cell: (row) => row.renderValue(),
        accessorKey: "tags",
      },
      {
        header: "Total Earned",
        cell: (row) => row.renderValue(),
        accessorKey: "earned_money",
      },
      {
        header: "Date",
        cell: (row) => row.renderValue(),
        accessorKey: "createdAt",
      },
    ],
    [],
  );

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>([]);
  const handleDataChange = (data: []) => {
    setOrders(data);
    setIsLoading(false);
  };
  return (
    <>
      {(isLoading && <Loader />) || (
        <>
          <TitleHead
            title="influencer Info"
            metaTitle="influencer info"
            metaDesc="influencers"
          />
          <InnerHeader title="Basic Info" />
          <DataDetailCard user={influencer["influencer"]} />
          <InnerHeader title="Earned" />
          <DataDetailCard
            otherData={{
              totalEarned: influencer["influencer"]["raised_money"],
              noOfTags: influencer["influencer"]["total_tags"],
              noOfChains: influencer["influencer"]["total_chains"],
            }}
          />
          <InnerHeader title="Order History" />
          <Table data={orders || []} columns={cols} />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/influencers/get/${influencer["influencer"].id}/transactions?page=${pageNumber}&limit=10`}
        parameter="transactions"
      />
    </>
  );
};

export default InfluencerInfo;

InfluencerInfo.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { influencerId } = context.params as IParams;
  try {
    const influencer = await getInfluencerInfo(influencerId);
    return {
      props: {
        influencer: influencer.data.result,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
