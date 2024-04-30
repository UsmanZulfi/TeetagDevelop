import DataDetailCard from "@/dashboard/components/DataDetailCard/DataDetailCard";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getMinionInfo } from "@/website/lib/networkCalls/dashboard/userDetails";
import { Minion } from "@/website/lib/types/teetagTypes";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMemo, useState } from "react";
interface IParams extends ParsedUrlQuery {
  minionId: string;
}

interface minionInfoProps {
  minion: Minion;
}

const MinionInfo = ({ minion }: minionInfoProps) => {
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
            title="State Ambassadors Info"
            metaTitle="State Ambassadors info"
            metaDesc="State Ambassadors"
          />
          <InnerHeader title="Basic Info" />
          <DataDetailCard user={minion["minion"]} />
          <InnerHeader title="Earned" />
          <DataDetailCard
            otherData={{
              totalEarned: minion["minion"]["raised_money"],
              noOfTags: minion["minion"]["total_tags"],
              noOfChains: minion["minion"]["total_chains"],
            }}
          />
          <InnerHeader title="Orders In Chain" />
          <Table data={orders || []} columns={cols} />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/minions/get/${minion["minion"].id}/transactions?page=${pageNumber}&limit=10`}
        parameter="transactions"
      />
    </>
  );
};

export default MinionInfo;

MinionInfo.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { minionId } = context.params as IParams;
  try {
    const minion = await getMinionInfo(minionId);
    return {
      props: {
        minion: minion.data.result,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
