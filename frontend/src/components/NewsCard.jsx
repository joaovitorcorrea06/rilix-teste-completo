import { Link } from "react-router-dom";

export default function NewsCard({
  news,
  onClick,
  isAdmin = true,
  onInactivate,
  onDelete,
}) {
  const inactive = !news.is_active;

  const isBase64 = news.image_key?.startsWith("data:image");

  return (
    <div
      data-testid="news-card"
      className={`relative rounded-xl shadow bg-white flex flex-col overflow-hidden transition border ${inactive ? "border-gray-300 opacity-70" : "hover:shadow-lg"
        }`}
    >
      {/* Tag “Inativa” */}
      {inactive && (
        <span className="absolute top-2 left-2 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded font-medium z-10">
          Inativa
        </span>
      )}

      {/* Imagem */}
      {/* <img
        src={news.image_key}
        alt={news.title}
        className="w-full h-40 object-cover"
      /> */}

      <img
        src={isBase64 ? news.image_key : news.image_key}
        alt={news.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Conteúdo principal */}
        <div
          className={`mb-2 cursor-pointer`}
          onClick={onClick}
        >
          <h3 className="font-bold text-lg mb-1">{news.title}</h3>
          <p className="text-sm text-gray-600">{news.resume}</p>
        </div>

        {/* Ações administrativas */}
        {isAdmin && (
          <div className="mt-3 flex justify-between items-center text-sm text-blue-600">
            <Link
              to={`/news/edit/${news.id}`}
              className="hover:underline"
            >
              Editar
            </Link>

            <button
              onClick={() => onInactivate(news.id)}
              className="text-yellow-600 hover:underline cursor-pointer"
            >
              {news.is_active ? "Inativar" : "Ativar"}
            </button>

            <button
              onClick={() => onDelete(news.id)}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
