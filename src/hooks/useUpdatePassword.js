import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { toast } from "react-toastify";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: updatePassword } = useMutation({
    mutationFn: async ({ oldPassword, newPassword }) => {
      await api.patch("/user/update-password", { oldPassword, newPassword });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
      toast.success("updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.message
      );
    },
  });
  return { isPending, updatePassword };
};
