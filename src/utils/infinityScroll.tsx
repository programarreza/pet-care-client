import { useEffect } from "react";

const infiniteScroll = (
  page: number,
  setPage: any,
  totalItems: number,
  limit: number
) => {
  const totalPageCalc = Math.ceil(totalItems / limit);
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev: any) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page < totalPageCalc) {
      window.addEventListener("scroll", handelInfiniteScroll);
      return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }
  }, [totalPageCalc, page]);
};

export default infiniteScroll;
