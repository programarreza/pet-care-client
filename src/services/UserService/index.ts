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
    const { data } = await axiosInstance.get(`/users/me?email=${email}`);

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
