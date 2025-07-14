import { useQuery } from "@tanstack/react-query"; // v5 usa o namespace tanstack
import axios from "axios";

export function useNewsStats() {
  return useQuery({
    queryKey: ["news-stats"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/news/stats");
      return response.data;
    },
  });
}
