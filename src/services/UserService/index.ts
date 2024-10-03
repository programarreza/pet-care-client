import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
