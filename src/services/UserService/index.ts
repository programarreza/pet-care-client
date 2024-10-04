"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const updateUser = async (userId: string, userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${userId}`, userData);

    //   revalidateTag("users");

    return data;
  } catch (error: any) {
    console.log("from updateUser", error?.response?.data?.message);
    throw new Error(error);
  }
};
