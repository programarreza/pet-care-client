import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createContent,
  CreatePayment,
  Downvote,
  getContents,
  StatusChange,
  Upvote,
} from "../services/Content";
import { TQueryParams } from "../types";

export const useCreateContent = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_CONTENT"],
    mutationFn: async (postData) => createContent(postData),
    onSuccess: () => {
      toast.success("Content post successfully!");

      // Invalidate or refetch the contents after mutation success
      queryClient.invalidateQueries({ queryKey: ["GET_CONTENTS"] }); // Invalidate the cache
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPVOTE"],
    mutationFn: async ({
      userId,
      contentId,
    }: {
      userId: string;
      contentId: string;
    }) => {
      return await Upvote(userId, contentId);
    },
    onSuccess: () => {
      // toast.success("upvote successfully!");

      // Invalidate or refetch the contents after mutation success
      queryClient.invalidateQueries({ queryKey: ["GET_CONTENTS"] }); // Invalidate the cache
    },
    onError: (error: any) => {
      toast.error(`Failed to upvote: ${error.message}`);
    },
  });
};

export const useDownvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DOWNVOTE"],
    mutationFn: async ({
      userId,
      contentId,
    }: {
      userId: string;
      contentId: string;
    }) => {
      return await Downvote(userId, contentId);
    },
    onSuccess: () => {
      // toast.success("downvote successfully!");

      // Invalidate or refetch the contents after mutation success
      queryClient.invalidateQueries({ queryKey: ["GET_CONTENTS"] }); // Invalidate the cache
    },
    onError: (error: any) => {
      toast.error(`Failed to upvote: ${error.message}`);
    },
  });
};

export const useStatusChange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["STATUS_CHANGE"],
    mutationFn: async ({
      contentId,
      status,
    }: {
      contentId: string;
      status: string;
    }) => {
      return await StatusChange(contentId, status);
    },
    onSuccess: () => {
      toast.success("status changed!");

      // Invalidate or refetch the contents after mutation success
      queryClient.invalidateQueries({ queryKey: ["GET_CONTENTS"] });
      // Invalidate the cache
    },
    onError: (error: any) => {
      toast.error(`Failed to status change: ${error.message}`);
    },
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async ({ user }: { user: string }) => {
      return await CreatePayment(user);
    },
    onSuccess: () => {
      // toast.success("create payment successful");
    },
    onError: (error: any) => {
      toast.error(`Failed to create payment: ${error.message}`);
    },
  });
};

export const useGetContents = (
  page: number,
  pageSize: number,
  params: TQueryParams[],
) => {
  return useQuery({
    queryKey: ["GET_CONTENTS", page, pageSize, params],
    queryFn: async () => {
      return await getContents(page, pageSize, params);
    },
  });
};

// export const useGetContents = (
//   page: number,
//   pageSize: number,
//   params: TQueryParams[]
// ) => {
//   return useQuery({
//     queryKey: ["GET_CONTENTS", page, pageSize, params],
//     queryFn: async () => getContents(page, pageSize, params),
//     // staleTime: 60000, // Optional: Adjust cache stale time based on your needs
//   });
// };
