import { useQuery } from "@tanstack/react-query";
// import { getCategories } from "../services/Categories";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { getUserProfile, updateUser } from "../services/UserService";
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

// export const useGetUserProfile = () => {
//   return useQuery({
//     queryKey: ["GET_USER_PROFILE"],
//     queryFn: async (email) => await getUserProfile(email),
//   });
// };

export const useGetUserProfile = (email: string) => {
  return useQuery({
    queryKey: ["GET_USER_PROFILE", email],
    queryFn: async () => await getUserProfile(email),
    enabled: !!email, // Prevent query from running if email is not available
  });
};
