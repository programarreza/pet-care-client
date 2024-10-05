"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const updateUser = async (userId: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${userId}`, userData);

    revalidateTag("userProfile");

    return data;
  } catch (error: any) {
    console.log("from updateUser", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const getUserProfile = async (email: string) => {
  try {
    let fetchOptions = {};

    fetchOptions = {
      next: {
        tags: ["userProfile"],
      },
    };

    const { data } = await axiosInstance.get(
      `/users/me?email=${email}`,
      fetchOptions
    );

    return data?.data;
  } catch (error: any) {
    console.log("from updateUser", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const getUsers = async () => {
  let fetchOptions = {};

  fetchOptions = {
    next: {
      tags: ["users"],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/users`, fetchOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch users data");
  }

  return res.json();
};

export const follow = async (followData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/follow", followData);

    revalidateTag("users");
    revalidateTag("userProfile");

    return data;
  } catch (error: any) {
    console.log("from follow", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const unFollow = async (unFollowData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/un-follow", unFollowData);

    revalidateTag("users");
    revalidateTag("userProfile");

    return data;
  } catch (error: any) {
    console.log("from follow", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const blockStatusChange = async (userId: string, isBlock: boolean) => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/block-status/${userId}`,
      { isBlock }
    );

    revalidateTag("users");
    revalidateTag("userProfile");

    return data;
  } catch (error: any) {
    console.log("from blockStatusChange", error?.response?.data?.message);
    throw new Error(error);
  }
};

export const roleStatusChange = async (userId: string, role: string) => {
  try {
    const { data } = await axiosInstance.patch(`/users/change-role/${userId}`, {
      role,
    });

    revalidateTag("users");
    revalidateTag("userProfile");

    return data;
  } catch (error: any) {
    console.log("from roleStatusChange", error?.response?.data?.message);
    throw new Error(error);
  }
};
