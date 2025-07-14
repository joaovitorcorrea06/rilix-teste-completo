import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiRss, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/rilix_logo.png"; // Certifique-se de que o caminho está correto

const navItems = [
  { label: "Dashboard", path: "/", icon: <FiHome /> },
  { label: "Notícias", path: "/news", icon: <FiRss /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Topbar sempre visível no mobile */}
      <div className="md:hidden bg-[#4e73df] text-white flex items-center justify-between px-4 py-3 shadow">
        <span className="font-bold text-lg">Rilix</span>
        <button onClick={() => setOpen(true)} aria-label="Abrir menu">
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar desktop fixa */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#4e73df] text-white shadow">
        <div className="p-6 flex items-center justify-center border-b border-blue-500">
          <img src={logo} alt='logo' />
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ is_active }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-[#627ed3] transition ${is_active ? "bg-blue-500" : ""
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-500 text-sm">
          <button className="flex items-center gap-2 hover:text-blue-300">
            <FiLogOut /> Sair
          </button>
          <div className="text-xs text-blue-200 mt-1">v2.0.1</div>
        </div>
      </aside>

      {/* Sidebar mobile (drawer) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-blue-600 text-white w-full flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-blue-500">
              <span className="font-bold text-xl">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Fechar menu">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ is_active }) =>
                    `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-500 transition ${is_active ? "bg-blue-500" : ""
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay ao abrir o menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
