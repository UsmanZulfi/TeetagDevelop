import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { getUserInfo } from "@/website/lib/networkCalls/authFunctions";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AnalyticsCardWrapper from "./AnalyticsCardWrapper";

const DashboardWrapper = () => {
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
        accessorKey: "billing.name",
      },
      {
        header: "State of tagger",
        cell: (row) => row.renderValue(),
        accessorKey: "tager_state",
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
  const role = getUserInfo()?.role;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>([]);
  const handleDataChange = (data: []) => {
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (role == "scholarshipRecipient") return;
  }, [role]);
  return (
    <>
      {(isLoading && <Loader />) || (
        <>
          <AnalyticsCardWrapper />
          <div className="mt-8">
            <InnerHeader
              title="Recent Orders"
              component={
                <div className="col-span-8">
                  <div className="grid grid-cols-12">
                    <Link
                      href="/dashboard/orders"
                      className="text-center btn-teetag-slim p-7 col-span-4 col-start-9"
                    >
                      See All
                    </Link>
                  </div>
                </div>
              }
            />
            <Table data={orders || []} columns={cols} />
          </div>
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/${role}/transactions?page=${pageNumber}&limit=10`}
        parameter="transactions"
      />
    </>
  );
};

export default DashboardWrapper;
