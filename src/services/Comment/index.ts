"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/comments/create-comment",
      commentData
    );

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    console.log("from createComment", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const getComments = async (contentId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["comments"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/comments/${contentId}`,
    fetchOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
