import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useNewsById(id) {
  return useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const { data } = await api.get(`/news/${id}`);
      return data;
    },
    enabled: !!id, // só busca se houver ID
  });
}
