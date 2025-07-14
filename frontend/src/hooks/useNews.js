// hooks/useNews.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useNews = (search = "") => {
  return useQuery({
    queryKey: ["news", search],
    queryFn: async () => {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/news/all", {
        params: { search },
      });
      return res.data;
    },
  });
};
