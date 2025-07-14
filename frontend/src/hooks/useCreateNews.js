import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNews } from "../services/newsService";

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
    },
  });
}
