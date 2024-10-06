"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { getCurrentUser } from "../AuthService";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

export const createContent = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/contents/create-content",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidateTag("contents");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getContents = async (searchValue: string = "") => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["contents"],
    },
    cache: "no-store",
  };

  const res = await fetch(
    `${envConfig.baseApi}/contents?searchTerm=${searchValue}`,
    fetchOptions
  );
  if (!res.ok) {
    throw new Error("Failed to fetch content data");
  }

  return res.json();
};

export const getMyContents = async () => {
  const user = await getCurrentUser();

  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["myContents"],
    },
  };

  // Ensure the user data is available
  if (!user || !user.email) {
    throw new Error("User not logged in or email not found");
  }

  try {
    const { data } = await axiosInstance.get(
      `/contents/my-contents?email=${user?.email}`,
      fetchOptions
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const Upvote = async (userId: string, contentId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/contents/upvote/${contentId}`,
      { userId }
    );

    revalidateTag("contents");
    revalidateTag("myContents");

    return data;
  } catch (error: any) {
    console.log("from Upvote", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const Downvote = async (userId: string, contentId: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/contents/downvote/${contentId}`,
      { userId }
    );

    revalidateTag("contents");
    revalidateTag("myContents");

    return data;
  } catch (error: any) {
    console.log("from Upvote", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const StatusChange = async (contentId: string, status: string) => {
  try {
    const { data } = await axiosInstance.patch(
      `/contents/change-status/${contentId}`,
      { status }
    );

    revalidateTag("contents");
    revalidateTag("myContents");

    return data;
  } catch (error: any) {
    console.log("from StatusChange", error?.response?.data?.message);
    throw new Error(error);
  }
};
