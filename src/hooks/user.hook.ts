import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  blockStatusChange,
  follow,
  getUserProfile,
  roleStatusChange,
  unFollow,
  updateUser,
} from "../services/UserService";
import { toast } from "sonner";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: FieldValues;
    }) => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
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
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (followData) => follow(followData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useUnFollow = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UN_FOLLOW"],
    mutationFn: async (unFollowData) => unFollow(unFollowData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useBlockStatusChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["USER_BLOCK_STATUS_CHANGE"],
    mutationFn: async ({
      userId,
      isBlock,
    }: {
      userId: string;
      isBlock: boolean;
    }) => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
      return await blockStatusChange(userId, isBlock);
    },
    onSuccess: () => {
      toast.success("User status change!");
    },
    onError: (error: any) => {
      toast.error(`Failed to status change: ${error.message}`);
    },
  });
};

export const useRoleStatusChange = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["USER_ROLE_STATUS_CHANGE"],
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER_PROFILE"] });
      return await roleStatusChange(userId, role);
    },
    onSuccess: () => {
      toast.success("User role change!");
    },
    onError: (error: any) => {
      toast.error(`Failed to status change: ${error.message}`);
    },
  });
};
