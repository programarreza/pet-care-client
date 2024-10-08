"use server";

import { revalidateTag } from "next/cache";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { TQueryParams } from "@/src/types";

import { getCurrentUser } from "../AuthService";

export const createContent = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/contents/create-content",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    revalidateTag("contents");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getContents = async (
  page: number,
  pageSize: number,
  args: TQueryParams[],
) => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["contents"],
    },
    cache: "no-store",
  };

  const params = new URLSearchParams();

  params.append("sort", "-createdAt");
  params.append("page", page.toString());
  params.append("limit", pageSize.toString());

  if (args) {
    args.forEach((item: TQueryParams) => {
      params.append(item.name, String(item.value));
    });
  }

  const res = await fetch(
    `${envConfig.baseApi}/contents?${params.toString()}`,
    fetchOptions,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch content data");
  }

  return await res.json();
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
      fetchOptions,
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
      { userId },
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
      { userId },
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
      { status },
    );

    revalidateTag("contents");
    revalidateTag("myContents");

    return data;
  } catch (error: any) {
    console.log("from StatusChange", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const CreatePayment = async (user: string) => {
  try {
    const { data } = await axiosInstance.post(`/payments/create-payment`, {
      user,
    });

    return data?.data;
  } catch (error: any) {
    console.log("from CreatePayment", error?.response?.data?.message);
    throw new Error(error);
  }
};
