import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNews } from "../services/newsService";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
    },
  });
}
