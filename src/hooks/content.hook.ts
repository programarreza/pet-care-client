import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createContent } from "../services/Content";
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
