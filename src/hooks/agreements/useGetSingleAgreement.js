import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useGetSingleAgreement = ({ id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["agreement", id],
    queryFn: async () => {
      const { data } = await api.get(`/agreement/user/${id}`, {
        withCredentials: true,
      });
      return data;
    },
  });
  return { isLoading, data, isError, error };
};
