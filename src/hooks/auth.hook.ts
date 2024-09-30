import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { registerUser } from "../services/AuthService";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};
