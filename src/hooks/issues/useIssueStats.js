import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useIssueStats() {
  return useQuery({
    queryKey: ["issue-stats"],
    queryFn: async () => {
      const res = await api.get("/issue/stats", { withCredentials: true });

      return res.data;
    },
    staleTime: 1000 * 60,
  });
}
