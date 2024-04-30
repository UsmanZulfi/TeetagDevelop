import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useEffect, useMemo, useState } from "react";

const Applications = () => {
  const cols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Application ID",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "user.name",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "user.email",
      },
      {
        header: "Phone Number ",
        cell: (row) => row.renderValue(),
        accessorKey: "user.phone",
      },
      {
        header: "State",
        cell: (row) => row.renderValue(),
        accessorKey: "user.user_state.name",
      },
      {
        header: "Age",
        cell: (row) => row.renderValue(),
        accessorKey: "user.age",
      },
      {
        header: "Loss",
        cell: (row) => row.renderValue(),
        accessorKey: "reason",
      },
      {
        header: "Status",
        cell: (row) => row.renderValue(),
        accessorKey: "status",
      },
    ],
    [],
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allApplications, setAllApplications] = useState<any[]>([]);
  const handleDataChange = (data: any[]) => {
    setAllApplications(data);
    setIsLoading(false);
  };

  const [filter, setFilter] = useState<string>("");
  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPageNumber(1);
  };
  useEffect(() => {
    handleDataChange([]);
  }, [filter, pageNumber]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title="applications"
            metaTitle="applications"
            metaDesc="applications"
          />
          <InnerHeader title="APPlications" />
          <FilterBox
            values={["pending", "approved", "rejected"]}
            onChange={handleFilterChange}
          />

          <Table
            data={allApplications}
            columns={cols}
            link="/minions/application"
          />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/application/all?role=minion&status=${filter}&page=${pageNumber}&limit=10`}
        parameter="applications"
        filter={filter}
      />
    </>
  );
};

export default Applications;

Applications.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
