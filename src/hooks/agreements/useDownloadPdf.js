import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";

export const useDownloadPdf = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.get(`/agreement/user/download/${id}`, {
        responseType: "blob",
      });
      return data;
    },
  });
  return { isPending, mutateAsync };
};
