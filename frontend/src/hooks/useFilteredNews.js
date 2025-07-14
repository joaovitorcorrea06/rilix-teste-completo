import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFilteredNews = (status = "all", search = "") => {
  return useQuery({
    queryKey: ["news", status, search],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (status !== "all") params.append("status", status);
      if (search.trim()) params.append("search", search.trim());

      const response = await axios.get(import.meta.env.VITE_API_URL + `/news/all?${params.toString()}`);
      return response.data;
    },
  });
};
