import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetAgreements = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const { data } = await api.get("/agreement/user", {
        withCredentials: true,
      });
      return data;
    },
  });
  return { isError, isLoading, error, data };
};
