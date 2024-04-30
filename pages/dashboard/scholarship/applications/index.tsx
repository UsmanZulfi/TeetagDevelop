import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useMemo, useState } from "react";

const Scholarship = () => {
  const cols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "ID",
        cell: (row) => row.renderValue(),
        accessorKey: "application_id",
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
        header: "Target Amount($)",
        cell: (row) => row.renderValue(),
        accessorKey: "target_amount",
      },
      {
        header: "Raised Amount($)",
        cell: (row) => row.renderValue(),
        accessorKey: "raised_amount",
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title="Scholarship"
            metaTitle="scholarship"
            metaDesc="scholarship"
          />
          <InnerHeader title="Active/Complete/In-Active" />
          <Table
            data={allApplications}
            columns={cols}
            showActions={true}
            link="scholarship/applications"
            editLink="scholarship/applications"
          />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/scholarships/all?page=${pageNumber}&limit=10`}
        parameter="scholarships"
      />
    </>
  );
};

export default Scholarship;

Scholarship.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
