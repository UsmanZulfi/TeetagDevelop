import FilterBox from "@/dashboard/components/FilterBox/FilterBox";
import InnerHeader from "@/dashboard/components/InnerHeader/InnerHeader";
import { Table } from "@/dashboard/components/Table/Table";
import { User } from "@/dashboard/lib/types/dashboardTypes";
import { Loader } from "@/website/components/Loader/Loader";
import { Paginator } from "@/website/components/Paginator/Paginator";
import SearchBox from "@/website/components/SearchBox/SearchBox";
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
        header: "User ID",
        cell: (row) => row.renderValue(),
        accessorKey: "user_id",
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
        header: "Phone No.",
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
          <TitleHead
            title="applications"
            metaTitle="applications"
            metaDesc="applications"
          />
          <InnerHeader
            title="APPlications"
            component={
              <div className="col-span-6 col-start-7">
                <div className="grid grid-cols-12">
                  <div className="col-span-8 flex justify-end items-center">
                    <SearchBox handleSearch={handleSearch} />
                  </div>
                  <div className="col-span-4 flex justify-end items-center">
                    <FilterBox
                      values={["pending", "approved", "rejected"]}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            }
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
        apiURL={`/application/all?role=minion${
          filter ? `&status=${filter}` : ""
        }&page=${pageNumber}&limit=10&search=${search}`}
        parameter="applications"
        filter={filter}
        search={search}
      />
    </>
  );
};

export default Applications;

Applications.getLayout = function (page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
