import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleActiveNews } from "../services/newsService";

export function useToggleActiveNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleActiveNews,
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
    },
  });
}
