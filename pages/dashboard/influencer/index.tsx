import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { Influencer } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import SearchBox from "@/website/components/SearchBox/SearchBox";
import { TitleHead } from "@/website/components/TitleHead/TitleHead";
import { ColumnDef } from "@tanstack/react-table";
import DashboardLayout from "module/dashboard/layout/DashboardLayout";
import Link from "next/link";
import { useMemo, useState } from "react";

const Influencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDataChange = (data: Influencer[]) => {
    setInfluencers(data);
    setIsLoading(false);
  };
  const [search, setSearch] = useState<string>("");
  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const cols = useMemo<ColumnDef<Influencer>[]>(
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
        header: "Influencer Code",
        cell: (row) => row.renderValue(),
        accessorKey: "influencer_code",
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
            title="Influencers"
            metaTitle="influencers"
            metaDesc="influencers"
          />
          <InnerHeader
            title="Influencers List"
            component={
              <div className="col-span-8">
                <div className="grid grid-cols-12">
                  <div className="col-span-8 flex items-start col-end-8">
                    <SearchBox handleSearch={handleSearch} />
                  </div>
                  <Link
                    href="/dashboard/influencer/createinfluencer"
                    className="text-center btn-teetag-slim p-7 col-span-4 col-start-9"
                  >
                    Create Influencer
                  </Link>
                </div>
              </div>
            }
          />
          <Table
            data={influencers}
            columns={cols}
            link="influencer"
            showActions={true}
            type={"influencer"}
          />
        </>
      )}
      <Paginator
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onDataLoad={handleDataChange}
        apiURL={`/dashboard/admin/influencers?page=${pageNumber}&limit=10&search=${search}`}
        parameter="influencers"
        search={search}
      />
    </>
  );
};

export default Influencers;

Influencers.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
