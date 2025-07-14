import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function NewsModal({ news, isOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false); // Triggers exit animation
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (!visible) onClose(); // Desmonta somente após animação de saída
      }}
    >
      {visible && news && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden z-10"
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={news.image_key}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">{news.title}</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {news.description}
              </p>
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={handleClose}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
