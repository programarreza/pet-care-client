import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createContent, Downvote, Upvote } from "../services/Content";
import { toast } from "sonner";

export const useCreateContent = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_CONTENT"],
    mutationFn: async (postData) => createContent(postData),
    onSuccess: () => {
      toast.success("Content post successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpvote = () => {
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
    },
    onError: (error: any) => {
      toast.error(`Failed to upvote: ${error.message}`);
    },
  });
};

export const useDownvote = () => {
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
    },
    onError: (error: any) => {
      toast.error(`Failed to upvote: ${error.message}`);
    },
  });
};
