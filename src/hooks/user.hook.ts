import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { updateUser } from "../services/UserService";
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
      toast.success("Comment updated successfully!");
    },
    onError: (error: any) => {
      toast.error(`Failed to update comment: ${error.message}`);
    },
  });
};
