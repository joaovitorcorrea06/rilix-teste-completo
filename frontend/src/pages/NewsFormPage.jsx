import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreateNews } from "../hooks/useCreateNews";
import { useUpdateNews } from "../hooks/useUpdateNews";
import { useNews } from "../hooks/useNews";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression';

export default function NewsFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const { data: news } = useNews(); // usa dados reais da API

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_active: true,
    },
  });

  const imageKeyValue = watch("image_key");
  const MAX_IMAGE_SIZE_KB = 500;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Selecione um arquivo de imagem válido.");
      return;
    }

    try {
      // Opções de compressão
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800, // redimensiona para no máximo 800px
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size > MAX_IMAGE_SIZE_KB * 1024) {
        toast.error("Imagem comprimida ainda está muito grande. Use uma menor.");
        return;
      }

      // Converte para base64
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);

      setValue("image_key", base64);
      toast.success("Imagem carregada com sucesso!");

    } catch (err) {
      console.error(err);
      toast.error("Erro ao processar imagem.");
    }
  };

  useEffect(() => {
    if (isEditing && news) {
      const existing = news.find((item) => item.id === id);
      if (existing) {
        reset({
          title: existing.title || "",
          image_key: existing.image_key || "",
          resume: existing.resume || "",
          description: existing.description || "",
          is_active: existing.is_active ?? true,
        });
      }
    }
  }, [id, isEditing, news, reset]);


  const onSubmit = (data) => {
    const payload = {
      title: data.title,
      image_key: data.image_key,
      resume: data.resume,
      description: data.description,
      is_active: data.is_active,
    };

    if (!isEditing) {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Notícia criada com sucesso!");
          navigate("/news");
        },
        onError: () => toast.error("Erro ao criar notícia."),
      });
    } else {
      updateMutation.mutate(
        { id, data: payload },
        {
          onSuccess: () => {
            toast.success("Notícia atualizada com sucesso!");
            navigate("/news");
          },
          onError: () => toast.error("Erro ao atualizar notícia."),
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Editar Notícia" : "Nova Notícia"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Título <span className='text-red-600'>*</span></label>
          <input
            {...register("title", { required: "Título é obrigatório" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* <div>
          <label className="block font-medium">Imagem (URL) <span className='text-red-600'>*</span></label>
          <input
            {...register("image_key", { required: "Imagem é obrigatória" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.image_key && <p className="text-red-500 text-sm">{errors.image_key.message}</p>}
        </div> */}

        <div>
          <label className="block font-medium mb-1">
            Imagem <span className="text-red-600">*</span>
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Upload via arquivo */}
            <label className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded px-4 py-2 text-center transition">
              <span>Selecionar imagem</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Ou via link */}
            <input
              {...register("image_key", { required: "Imagem é obrigatória" })}
              placeholder="Ou cole a URL da imagem"
              className="flex-1 border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Erro de validação */}
          {errors.image_key && (
            <p className="text-red-500 text-sm mt-1">{errors.image_key.message}</p>
          )}

          {/* Preview da imagem */}
          {imageKeyValue && (
            <img
              src={imageKeyValue}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded shadow border"
            />
          )}
        </div>



        <div>
          <label className="block font-medium">Resumo <span className='text-red-600'>*</span></label>
          <textarea
            rows={2}
            {...register("resume", { required: "Resumo é obrigatório" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.resume && <p className="text-red-500 text-sm">{errors.resume.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Descrição <span className='text-red-600'>*</span></label>
          <textarea
            rows={4}
            {...register("description", { required: "Descrição é obrigatória" })}
            className="w-full border rounded px-3 py-2 mt-1"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            {...register("is_active")}
            id="is_active"
            className="w-4 h-4"
          />
          <label htmlFor="is_active" className="text-sm text-gray-700">
            Notícia Ativa
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/news")}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Salvar alterações" : "Criar Notícia"}
          </button>
        </div>
      </form>
    </div>
  );
}
