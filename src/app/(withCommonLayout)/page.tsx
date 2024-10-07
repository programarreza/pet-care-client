"use client";

import ContentCard from "@/src/components/UI/Content/ContentCard";
import { useUser } from "@/src/context/user.provider";
import { useGetContents } from "@/src/hooks/content.hook";
import { IContent } from "@/src/types";
import infiniteScroll from "@/src/utils/infinityScroll";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";

const HomePage = () => {
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

  infiniteScroll(page, setPage, data?.data?.meta?.total, pageSize);

  return (
    <div className="">
      {contents.map((content: IContent, index: number) => (
        <ContentCard key={index} content={content} />
      ))}
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

export default HomePage;
