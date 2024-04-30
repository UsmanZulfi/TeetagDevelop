import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import SearchBox from "@/website/components/SearchBox/SearchBox";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useMemo, useState } from "react";

const Orders = () => {
  const adminCols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Order ID",
        cell: (row) => row.renderValue(),
        accessorKey: "order_id",
      },
      {
        header: "Customer Name",
        cell: (row) => row.renderValue(),
        accessorKey: "billing.name",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "billing.email",
      },
      {
        header: "Purchase Date",
        cell: (row) => row.renderValue(),
        accessorKey: "createdAt",
      },
      {
        header: "Player ID",
        cell: (row) => row.renderValue(),
        accessorKey: "user_id",
      },
      {
        header: "State",
        cell: (row) => row.renderValue(),
        accessorKey: "tager_state",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "user.phone",
      },
      {
        header: "Source",
        cell: (row) => row.renderValue(),
        accessorKey: "payment_gateway",
      },
      {
        header: "Raised Money",
        cell: (row) => row.renderValue(),
        accessorKey: "raised_money",
      },
      {
        header: "Order Total",
        cell: (row) => row.renderValue(),
        accessorKey: "total",
      },
    ],
    [],
  );
  const userCols = useMemo<ColumnDef<User>[]>(() => {
    const columns = [
      {
        header: "Order ID",
        cell: (row) => row.renderValue(),
        accessorKey: "order_id",
      },
      {
        header: "Customer Name",
        cell: (row) => row.renderValue(),
        accessorKey: "billing.name",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "billing.email",
      },
      {
        header: "State of tagger",
        cell: (row) => row.renderValue(),
        accessorKey: "tager_state",
      },
      {
        header: "Purchase Date",
        cell: (row) => row.renderValue(),
        accessorKey: "createdAt",
      },
      {
        header: "Person Tagged",
        cell: (row) => row.renderValue(),
        accessorKey: "shipping.name",
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
        header: "Source",
        cell: (row) => row.renderValue(),
        accessorKey: "payment_gateway",
      },
      {
        header: "Order Total",
        cell: (row) => row.renderValue(),
        accessorKey: "total",
      },
    ];

    if (getUserInfo().role !== "user") {
      columns.push({
        header: "Total Earned",
        cell: (row) => row.renderValue(),
        accessorKey: "earned_money",
      });
    }

    return columns;
  }, []);

  const role = getUserInfo()?.role;
  const cols = role == "admin" ? adminCols : userCols;

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>([]);
  const handleDataChange = (data: []) => {
    setOrders(data);
    setIsLoading(false);
  };

  const [search, setSearch] = useState<string>("");
  const handleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead title="Orders" metaTitle="orders" metaDesc="orders" />
          <InnerHeader
            title="orders"
            component={
              <div className="col-span-6 col-start-7">
                <SearchBox handleSearch={handleSearch} />
              </div>
            }
          />
          {orders.length >= 1 ? (
            <Table data={orders} columns={cols} link="orders" />
          ) : (
            <h1 className="flex justify-center items-center h-screen">
              No Orders found
            </h1>
          )}
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/${role}/transactions?page=${pageNumber}&limit=10&search=${search}`}
        parameter="transactions"
        search={search}
      />
    </>
  );
};

export default Orders;

Orders.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
