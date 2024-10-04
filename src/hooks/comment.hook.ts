import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createComment,
  deleteComment,
  updateComment as updateCommentService,
} from "../services/Comment";

export const useCreateComment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (userData) => createComment(userData),
    // onSuccess: () => {

    // },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      // toast.success("Comment deleted successfully!");
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({
      commentId,
      updateComment,
    }: {
      commentId: string;
      updateComment: FieldValues;
    }) => {
      return await updateCommentService(commentId, updateComment);
    },
    onSuccess: () => {
      toast.success("Comment updated successfully!");
    },
    onError: (error: any) => {
      toast.error(`Failed to update comment: ${error.message}`);
    },
  });
};
