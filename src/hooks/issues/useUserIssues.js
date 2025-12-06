import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useUserIssues(filter) {
  return useQuery({
    queryKey: ["user-issues", filter],
    queryFn: async () => {
      const status =
        filter === "ALL"
          ? "ALL"
          : filter === "Resolved"
          ? "Resolved"
          : filter === "Pending"
          ? "Pending"
          : "ALL";

      const res = await api.get(`/issue?status=${status}&currentPage=1`, { withCredentials: true });

      return res.data;
    },
  });
}
