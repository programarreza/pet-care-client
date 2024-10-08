"use client";

import AllContentCard from "@/src/components/UI/Content/AllContentCard";
import { useUser } from "@/src/context/user.provider";
import { useGetContents } from "@/src/hooks/content.hook";
import { IContent } from "@/src/types";
import useInfiniteScroll from "@/src/utils/infinityScroll";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";

const AllContentsPage = () => {
  const { params } = useUser();
  const [contents, setContents] = useState<IContent[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isSuccess } = useGetContents(page, pageSize, params);

  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
    setContents([]);
  }, [params]);

  useEffect(() => {
    if (data?.data?.result) {
      if (page > 1) {
        setContents((prevData) => [...prevData, ...data?.data?.result]);
      } else {
        setContents([...data?.data?.result]);
      }
    }
  }, [data, page]);

  useInfiniteScroll(page, setPage, data?.data?.meta?.total, pageSize);

  return (
    <div className="">
      <AllContentCard contents={contents} />
      {isLoading && !isSuccess && (
        <div className="bg-[#101214] min-h-screen rounded-lg">
          <div className="w-full flex justify-center items-center py-24">
            <Spinner color="primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllContentsPage;
