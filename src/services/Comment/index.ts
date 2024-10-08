"use server";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createComment = async (commentData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/comments/create-comment",
      commentData,
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

  const { data } = await axiosInstance.get(
    `/comments/${contentId}`,
    fetchOptions,
  );

  return data?.data;
};

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${commentId}`);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    console.log("from deleteComment", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const updateComment = async (
  commentId: string,
  updateComment: FieldValues,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/comments/${commentId}`,
      updateComment,
    );

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    console.log("from updateComment", error?.response?.data?.message);
    throw new Error(error);
  }
};
