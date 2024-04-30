import DataDetailCard from "@/dashboard/components/DataDetailCard/DataDetailCard";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUserInfo } from "@/website/lib/networkCalls/dashboard/userDetails";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useMemo, useState } from "react";
interface IParams extends ParsedUrlQuery {
  userId: string;
}

interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  const cols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Order ID",
        cell: (row) => row.renderValue(),
        accessorKey: "order_id",
      },
      {
        header: "Tagee Name",
        cell: (row) => row.renderValue(),
        accessorKey: "shipping.name",
      },
      {
        header: "Tagee Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "tagee_phone",
      },
      {
        header: "Shipping Cost",
        cell: (row) => row.renderValue(),
        accessorKey: "shipping_cost",
      },
      {
        header: "Total",
        cell: (row) => row.renderValue(),
        accessorKey: "total",
      },
      {
        header: "State Ambassador Code",
        cell: (row) => row.renderValue(),
        accessorKey: "minion_code",
      },
      {
        header: "Payment Status",
        cell: (row) => row.renderValue(),
        accessorKey: "payment_status",
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead title="User Info" metaTitle="user info" metaDesc="users" />
          <InnerHeader title="Basic Info" />
          <DataDetailCard user={user} />
          <InnerHeader title="Order History" />
          <Table data={orders.rows || []} columns={cols} />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/users/get/${user.id}/transactions?page=${pageNumber}&limit=10`}
        parameter="transactions"
      />
    </>
  );
};

export default UserInfo;

UserInfo.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as IParams;
  try {
    const user = await getUserInfo(userId);
    return {
      props: {
        user: user.data.result,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
