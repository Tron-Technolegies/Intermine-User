import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export default function useIssueMessages(issueId) {
  return useQuery({
    queryKey: ["issue-messages", issueId],
    queryFn: async () => {
      const res = await api.get(`/issue/issue-messages/${issueId}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!issueId,
  });
}
