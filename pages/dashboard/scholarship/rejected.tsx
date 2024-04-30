import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { useMemo, useState } from "react";
const RejectedApplications = () => {
  const rejectedCols = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "App ID",
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
  const [pageNumberRejected, setPageNumberRejected] = useState<number>(1);
  const [isLoadingRejected, setIsLoadingRejected] = useState<boolean>(true);
  const [rejectedApplications, setRejectedApplications] = useState<any[]>([]);

  const handleRejectedDataChange = (data: any[]) => {
    setRejectedApplications(data);
    setIsLoadingRejected(false);
  };

  return (
    <>
      {isLoadingRejected ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title="Scholarship"
            metaTitle="scholarship"
            metaDesc="scholarship"
          />
          <InnerHeader title="Rejected" />
          <Table
            data={rejectedApplications}
            columns={rejectedCols}
            showActions={false}
          />
        </>
      )}

      <Paginator
        pageNumber={pageNumberRejected}
        onPageChange={setPageNumberRejected}
        onDataLoad={handleRejectedDataChange}
        apiURL={`/dashboard/admin/applications?role=scholarshipRecipient&status=rejected&page=${pageNumberRejected}&limit=10`}
        parameter="applications"
      />
    </>
  );
};

export default RejectedApplications;

RejectedApplications.getLayout = function getLayout(page: any) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
