import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useClientMiners() {
  return useQuery({
    queryKey: ["client-miners"],
    queryFn: async () => {
      const res = await api.get("miner/user-miner");
      return res.data;
    },
  });
}
