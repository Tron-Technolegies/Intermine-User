import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";

export default function useNotifications() {
  const queryClient = useQueryClient();

  // FETCH NOTIFICATIONS
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notification/user", {
        withCredentials: true,
      });
      return res.data || [];
    },
  });

  // CLEAR ONE NOTIFICATION
  const clearOne = useMutation({
    mutationFn: async (id) => {
      return await api.patch(
        `/notification/user/${id}`,
        {},
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // CLEAR ALL NOTIFICATIONS
  const clearAll = useMutation({
    mutationFn: async () => {
      return await api.patch(
        "/notification/user/all",
        {},
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return {
    notificationsQuery,
    clearOne,
    clearAll,
  };
}
