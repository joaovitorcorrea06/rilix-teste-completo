import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFilteredNews } from "../hooks/useFilteredNews";
import { useToggleActiveNews } from "../hooks/useToggleActiveNews";
import { useDeleteNews } from "../hooks/useDeleteNews";
import NewsCard from "../components/NewsCard";
import NewsModal from "../components/NewsModal";
import { toast } from "react-toastify";

export default function NewsPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, inactive
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce manual de 1s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data: news = [], isLoading } = useFilteredNews(
    filter === "inactive" ? "all" : filter,
    debouncedSearch
  );

  const toggleMutation = useToggleActiveNews();
  const deleteMutation = useDeleteNews();

  const handleInactivate = (id) => {
    toggleMutation.mutate(id, {
      onSuccess: () => toast.success("Status atualizado com sucesso!"),
      onError: () => toast.error("Erro ao atualizar status."),
    });
  };

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Notícia excluída!"),
        onError: () => toast.error("Erro ao excluir notícia."),
      });
    }
  };

  const filteredNews = [...news]
    .filter((n) => (filter === "inactive" ? !n.is_active : true))
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="p-4">
      {/* Filtros e busca */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar por título, resumo ou descrição..."
          className="border px-3 py-2 rounded w-full sm:w-1/2 text-sm"
        />

        <Link
          to="/news/new"
          className="bg-[#4e73df] text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Notícia
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2 px-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filtrar:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="active">Ativas</option>
            <option value="inactive">Inativas</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Ordenar:</span>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Mais recentes</option>
            <option value="asc">Mais antigas</option>
          </select>
        </div>
      </div>

      {/* Lista de notícias */}
      {isLoading ? (
        <div className="p-4">Carregando notícias...</div>
      ) : filteredNews.length === 0 ? (
        <div className="p-4 text-gray-500">Nenhuma notícia encontrada.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onClick={() => setSelected(item)}
              onInactivate={handleInactivate}
              onDelete={handleDelete}
              isAdmin
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <NewsModal
        news={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
