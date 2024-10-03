import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createComment } from "../services/Comment";
import { toast } from "sonner";

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
