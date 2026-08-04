import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useIssueTypes() {
  return useQuery({
    queryKey: ["issue-types"],
    queryFn: async () => {
      const res = await api.get("issue/type", { withCredentials: true });
      const filtered = res.data?.filter((item) => !item.adminOnly);
      return filtered;
    },
    staleTime: 1000 * 60 * 5,
  });
}
