import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import SearchBox from "@/website/components/SearchBox/SearchBox";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import { Minion } from "module/website/lib/types/teetagTypes";
import Link from "next/link";
import { useMemo, useState } from "react";

const Minions = () => {
  const [minions, setMinions] = useState<Minion[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataChange = (data: Minion[]) => {
    setMinions(data);
    setIsLoading(false);
  };

  const [search, setSearch] = useState<string>("");
  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const cols = useMemo<ColumnDef<Minion>[]>(
    () => [
      {
        header: "User ID",
        cell: (row) => row.renderValue(),
        accessorKey: "id",
      },
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "State",
        cell: (row) => row.renderValue(),
        accessorKey: "state",
      },
      {
        header: "Email",
        cell: (row) => row.renderValue(),
        accessorKey: "email",
      },
      {
        header: "Total Tags",
        cell: (row) => row.renderValue(),
        accessorKey: "total_tags",
      },
      {
        header: "Total Chains",
        cell: (row) => row.renderValue(),
        accessorKey: "total_chains",
      },
      {
        header: "State Ambassador Code",
        cell: (row) => row.renderValue(),
        accessorKey: "minion_code",
      },
      {
        header: "Phone",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
      {
        header: "Earned This Month",
        cell: (row) => row.renderValue(),
        accessorKey: "this_month_earning",
      },
      {
        header: "Total Earnings",
        cell: (row) => row.renderValue(),
        accessorKey: "raised_money",
      },
    ],
    [],
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleHead
            title="State Ambassadors"
            metaTitle="minions"
            metaDesc="minions"
          />
          <InnerHeader
            title="State Ambassadors"
            component={
              <div className="col-span-8">
                <div className="grid grid-cols-12">
                  <div className="col-span-8 flex items-start col-end-8">
                    <SearchBox handleSearch={handleSearch} />
                  </div>
                  <Link
                    href="/dashboard/minions/create"
                    className="text-center btn-teetag-slim p-7 col-span-4 col-start-9"
                  >
                    Create State Ambassador
                  </Link>
                </div>
              </div>
            }
          />
          <Table
            data={minions}
            columns={cols}
            link="minions"
            showActions={true}
            type={"minion"}
          />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/minions?page=${pageNumber}&limit=10&search=${search}`}
        parameter="minions"
        search={search}
      />
    </>
  );
};

export default Minions;

Minions.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
