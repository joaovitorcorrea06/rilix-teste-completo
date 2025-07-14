import React from "react";
import { FaNewspaper, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNewsStats } from "../hooks/useNewsStats";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { data, isLoading, isError } = useNewsStats();

  if (isError) {
    toast.error("Erro ao carregar estatísticas");
  }

  const cards = [
    {
      label: "Total de Notícias",
      value: data?.total ?? "...",
      icon: <FaNewspaper className="text-blue-600 text-3xl" />,
      bg: "bg-blue-50",
    },
    {
      label: "Notícias Ativas",
      value: data?.active ?? "...",
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
      bg: "bg-green-50",
    },
    {
      label: "Notícias Inativas",
      value: data?.inactive ?? "...",
      icon: <FaTimesCircle className="text-red-600 text-3xl" />,
      bg: "bg-red-50",
    },
  ];

  const pieData = [
    { name: "Ativas", value: data?.active ?? 0 },
    { name: "Inativas", value: data?.inactive ?? 0 },
  ];

  const COLORS = ["#16a34a", "#dc2626"]; // verde e vermelho

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {isLoading ? (
        <div className="text-gray-600">Carregando dados...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg shadow ${card.bg}`}
              >
                <div>
                  <p className="text-gray-600 text-sm">{card.label}</p>
                  <p className="text-xl font-semibold">{card.value}</p>
                </div>
                {card.icon}
              </div>
            ))}
          </div>

          {/* Gráfico de Pizza */}
          <div className="bg-white shadow rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">Distribuição de Notícias</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                // label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
