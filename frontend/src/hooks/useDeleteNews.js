import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNews } from "../services/newsService";

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
    },
  });
}
