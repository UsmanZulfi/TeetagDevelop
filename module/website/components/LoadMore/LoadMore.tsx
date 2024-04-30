import axios from "axios";
// import { fetchProjects } from "pages/minions";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
// import { ReactQueryDevtools } from "react-query/devtools";

interface PaginatorProps {
  pageNumber: number;
  onPageChange: (newPageNumber: number) => void;
  onDataLoad: (data: any[]) => void;
  apiURL: string;
  parameter: string;
  categoryId: number;
}

export function LoadMore({
  pageNumber,
  onPageChange,
  onDataLoad,
  apiURL,
  parameter,
  categoryId,
}: PaginatorProps) {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const {
    data,
    error,
    fetchNextPage,
    // hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["data", categoryId],
    queryFn: ({ pageParam }) => fetchData(pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage;
    },
    staleTime: Infinity,
  });
  useEffect(() => {
    if (data) {
      const newData = data.pages.flat().filter((item) => item);
      onDataLoad(newData);
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 mb-20">
      {!isFetching && hasNextPage && (
        <button
          className="text-center lg:text-start btn-teetag yellow"
          onClick={() => {
            fetchNextPage();
          }}
          disabled={!hasNextPage}
        >
          Load More
        </button>
      )}
      {isFetching && page > 1 ? <LoadingSpinner /> : null}
    </div>
  );

  async function fetchData(pageNumber = 1) {
    setPage(pageNumber);
    const fetchQueryUrl =
      process.env.NEXT_PUBLIC_STAGING_SERVER_URL +
      apiURL +
      `&page=${pageNumber}&cursor=` +
      pageNumber;
    try {
      const response = await axios.get(fetchQueryUrl);
      const data = response.data.result[parameter];
      if (data.length === 0) {
        setHasNextPage(false);
        return;
      }
      console.log(data);
      onDataLoad(data);
      return data;
    } catch (error) {
      console.log(error);
      setHasNextPage(false);
      onDataLoad([]);
      return false;
    }
  }
}
