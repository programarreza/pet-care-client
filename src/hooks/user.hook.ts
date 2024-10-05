import { useQuery } from "@tanstack/react-query";
// import { getCategories } from "../services/Categories";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  blockStatusChange,
  follow,
  getUserProfile,
  unFollow,
  updateUser,
} from "../services/UserService";
import { toast } from "sonner";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: FieldValues;
    }) => {
      return await updateUser(userId, userData);
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
    },
    onError: (error: any) => {
      toast.error(`Failed to update comment: ${error.message}`);
    },
  });
};

export const useGetUserProfile = (email: string) => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE", email],
    queryFn: async () => await getUserProfile(email),
    enabled: !!email,
  });
};

export const useFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (followData) => follow(followData),
    // onSuccess: () => {

    // },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useUnFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UN_FOLLOW"],
    mutationFn: async (unFollowData) => unFollow(unFollowData),
    // onSuccess: () => {

    // },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useBlockStatusChange = () => {
  return useMutation({
    mutationKey: ["USER_BLOCK_STATUS_CHANGE"],
    mutationFn: async ({
      userId,
      statusData,
    }: {
      userId: string;
      statusData: boolean;
    }) => {
      return await blockStatusChange(userId, statusData);
    },
    onSuccess: () => {
      toast.success("User status change!");
    },
    onError: (error: any) => {
      toast.error(`Failed to status change: ${error.message}`);
    },
  });
};
