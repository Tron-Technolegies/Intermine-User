import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useIssueStats() {
  return useQuery({
    queryKey: ["issue-stats"],
    queryFn: async () => {
      const res = await api.get("/issue/stats", { withCredentials: true });

      const b = res.data;

      return {
        totalrepair: b.allIssues,
        completed: b.resolved,
        inprogress: b.pending,
        warranty: b.warranty,
        repair: b.repair,
      };
    },
    staleTime: 1000 * 60,
  });
}
