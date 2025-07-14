import { api } from "./api";

// GET /news (ativas)
export const fetchNews = async () => {
  const response = await api.get("/news");
  return response.data;
};

// GET /news/all
export const fetchAllNews = async () => {
  const response = await api.get("/news/all");
  return response.data;
};

// POST /news
export const createNews = async (data) => {
  const response = await api.post("/news", data);
  return response.data;
};

// PUT /news/:id
export const updateNews = async (id, data) => {
  const response = await api.put(`/news/edit/${id}`, data);
  return response.data;
};

// PATCH /news/:id
export const toggleActiveNews = async (id) => {
  const response = await api.patch(`/news/edit/${id}`);
  return response.data;
};

// DELETE /news/:id
export const deleteNews = async (id) => {
  const response = await api.delete(`/news/edit/${id}`);
  return response.data;
};
