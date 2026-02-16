import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/api";

export const useCheckAgreement = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      await api.get("/agreement/check-agreement");
    },
  });
  return { isPending, mutateAsync };
};
