import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import NewsPage from "./pages/NewsPage";
import NewsFormPage from "./pages/NewsFormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="md:flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/new" element={<NewsFormPage />} />
            <Route path="/news/edit/:id" element={<NewsFormPage />} />
            <Route path="*" element={<div className="p-4">Página não encontrada</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
