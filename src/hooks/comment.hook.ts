import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment as updateCommentService,
} from "../services/Comment";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (userData) => createComment(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENTS"] });
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENTS"] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update comment: ${error.message}`);
    },
  });
};

export const useGetComments = (contentId: string) => {
  return useQuery({
    queryKey: ["GET_COMMENTS", contentId],
    queryFn: async () => await getComments(contentId),
  });
};
