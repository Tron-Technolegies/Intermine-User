import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useUserStats() {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const { data } = await api.get("user/stats", {
        withCredentials: true,
      });
      return data;
    },
  });
}
