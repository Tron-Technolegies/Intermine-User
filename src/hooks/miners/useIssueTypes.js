import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useIssueTypes() {
  return useQuery({
    queryKey: ["issue-types"],
    queryFn: async () => {
      const res = await api.get("issue/type", { withCredentials: true });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
