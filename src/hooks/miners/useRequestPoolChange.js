import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useRequestPoolChange() {
  return useMutation({
    mutationFn: async (payload) => {
      return api.post("issue/pool-change", payload, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Request submitted!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Request failed");
    },
  });
}
