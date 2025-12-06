import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { toast } from "react-toastify";

export default function useReportIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      return api.post("issue/", payload, { withCredentials: true });
    },
    onSuccess: () => {
      toast.success("Issue submitted!");
      queryClient.invalidateQueries(["client-miners"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to submit issue");
    },
  });
}
