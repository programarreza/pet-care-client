"use server"

import envConfig from "@/src/config/envConfig";
import { getCurrentUser } from "../AuthService";
import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

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

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getContents = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/contents`, fetchOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch content data");
  }

  return res.json();
};

export const getMyContents = async () => {
  const user = await getCurrentUser();

  // Ensure the user data is available
  if (!user || !user.email) {
    throw new Error("User not logged in or email not found");
  }

  try {
    const { data } = await axiosInstance.get(
      `/contents/my-contents?email=${user?.email}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
