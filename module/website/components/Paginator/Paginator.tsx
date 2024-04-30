import axios from "axios";
import Image from "next/image";
// import { fetchProjects } from "pages/minions";
import { getAdminToken } from "@/website/lib/networkCalls/dashboard/userDetails";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import styles from "./Paginator.module.css";
// import { ReactQueryDevtools } from "react-query/devtools";

interface PaginatorProps {
  pageNumber: number;
  onPageChange: (newPageNumber: number) => void;
  onDataLoad: (data: any[]) => void;
  apiURL: string;
  parameter: string;
  filter?: string;
  search?: string;
}

export function Paginator({
  pageNumber,
  onPageChange,
  onDataLoad,
  apiURL,
  parameter,
  filter = "",
  search = "",
}: PaginatorProps) {
  const queryClient = useQueryClient();
  const [totalPages, setTotalPages] = useState(1);

  const handleNextPage = () => {
    onPageChange(pageNumber + 1);
  };

  const handlePrevPage = () => {
    onPageChange(pageNumber - 1);
  };

  const { status, data, isLoading, isPreviousData } = useQuery({
    queryKey: ["data", pageNumber],
    queryFn: () => fetchData(pageNumber),
    keepPreviousData: true,
    onSuccess: (data) => {
      onDataLoad(data);
    },
    staleTime: 1000 * 60,
  });

  // Prefetch the next pageNumber!
  useEffect(() => {
    if (!isPreviousData && totalPages >= pageNumber) {
      queryClient.prefetchQuery({
        queryKey: ["data", pageNumber + 1],
        queryFn: () => fetchData(pageNumber + 1),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, filter, search]);

  const previousControl = (
    <>
      <Image
        src="/assets/arrow-left.svg"
        width={10}
        height={10}
        alt="left-arrow"
      />
      <button className="" onClick={handlePrevPage} disabled={pageNumber === 1}>
        {" Prev"}
      </button>
      <p className="font-exo ml-10 mr-4">
        {pageNumber > 0 ? pageNumber - 1 : 0}
      </p>
    </>
  );

  const nextControl = (
    <>
      <p className="font-exo mr-10 ml-4">{pageNumber + 1}</p>
      <button
        className=""
        onClick={handleNextPage}
        disabled={pageNumber >= totalPages}
      >
        {"Next "}
      </button>{" "}
      <Image
        src="/assets/arrow-right.svg"
        width={10}
        height={10}
        alt="right-arrow"
      />
    </>
  );

  return (
    <>
      {totalPages != 1 && (
        <div className="flex items-center justify-center gap-4 mb-20 mt-10">
          {pageNumber - 1 > 0 && previousControl}
          <p
            className={`font-exo px-6 py-3 mx-1 bg-green-light text-black-dark ${styles.boxShadow__pagination}`}
          >
            {pageNumber}
          </p>
          {pageNumber !== totalPages && nextControl}
        </div>
      )}
    </>
  );

  async function fetchData(pageNumber = 0) {
    const fetchQueryUrl = process.env.NEXT_PUBLIC_STAGING_SERVER_URL + apiURL;
    const token = getAdminToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(fetchQueryUrl, config);
      const { result } = response.data;
      onDataLoad(result[parameter]);
      setTotalPages(result["pages"] || 1);
      return result[parameter];
    } catch (error) {
      console.log(error);
      onDataLoad([]);
      return [];
    }
  }
}
