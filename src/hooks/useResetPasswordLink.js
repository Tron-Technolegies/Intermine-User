import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

export const useResetPasswordWithLink = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await api.post("/user/reset-password-link", data);
    },
    onSuccess: () => {
      toast.success("Password reset successfuly");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(
        error.response.data.error ||
          error.response.data.message ||
          error.message ||
          "something went wrong",
      );
    },
  });
  return { isPending, mutateAsync };
};
