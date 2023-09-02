"use client";

import { UpdateWithProject } from "@/app/api/project/project";
import UpdateItem from "@/components/update/UpdateItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";

export default function UpdatePage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const fetchUpdates = async ({ pageParam = 0 }) => {
    const res = await fetch(
      `/api/update/paginated?projectId=${projectId}&page=${pageParam}`,
    );
    return res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<{ data: UpdateWithProject[]; nextPage: number }, Error>({
    queryKey: ["updates"],
    queryFn: fetchUpdates,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  });

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <section className="flex flex-col justify-center gap-2 w-[500px] mx-auto py-4">
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((update: UpdateWithProject) => (
            <UpdateItem key={update.id} update={update} />
          ))}
        </Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </section>
  );
}
