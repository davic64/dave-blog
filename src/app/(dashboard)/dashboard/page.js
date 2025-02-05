"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, Spinner } from "@/ui";
import { IconEye, IconFile, IconFileDots } from "@tabler/icons-react";
import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";

const data = [
  { name: "Enero", views: 100 },
  { name: "Febrero", views: 200 },
  { name: "Marzo", views: 150 },
  { name: "Abril", views: 250 },
  { name: "Mayo", views: 300 },
  { name: "Junio", views: 200 },
  { name: "Julio", views: 100 },
  { name: "Agosto", views: 200 },
  { name: "Septiembre", views: 150 },
  { name: "Octubre", views: 250 },
  { name: "Noviembre", views: 300 },
  { name: "Diciembre", views: 200 },
];

export default function Dashboard() {
  const { posts, loading, fetchOnlyFive } = useDashboardStore();

  useEffect(() => {
    fetchOnlyFive();
  }, [fetchOnlyFive]);

  return (
    <ProtectedRoute>
      <div className="space-y-4">
        <p className="text-2xl font-bold">Dashboard</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconEye size={16} className="text-gray-500" />
              <p className="text-sm text-gray-500">Vistas Totales</p>
            </div>
            <p className="text-2xl font-bold">100</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconFile size={16} className="text-gray-500" />
              <p className="text-sm text-gray-500">Posts Publicados</p>
            </div>
            <p className="text-2xl font-bold">
              {posts.filter((post) => post.status === "published").length}
            </p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconFileDots size={16} className="text-gray-500" />
              <p className="text-sm text-gray-500">Borradores</p>
            </div>
            <p className="text-2xl font-bold">
              {posts.filter((post) => post.status === "draft").length}
            </p>
          </Card>
        </div>
        <Card className="p-8 space-y-4">
          <p className="text-lg font-bold">Vistas por Mes</p>
          <AreaChart width={1080} height={300} data={data}>
            <Area
              type="monotone"
              dataKey="views"
              stroke="#8884d8"
              fill="#8884d880"
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
          </AreaChart>
        </Card>
        <Card className="px-8 space-y-4">
          <p className="text-lg font-bold">Posts Recientes</p>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner />
            </div>
          ) : posts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {posts.map((post, index) => (
                <div key={post.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          {dayjs(post.date.toDate())
                            .locale("es")
                            .format("D [de] MMMM [de] YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconEye size={16} className="text-gray-500" />
                      {/* Falta poner los views de las analíticas */}
                      <p className="text-sm text-gray-500">{post.views}</p>
                    </div>
                  </div>
                  {index < posts.length - 1 && (
                    <hr className="border-gray-800" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay posts disponibles</p>
          )}
        </Card>
      </div>
    </ProtectedRoute>
  );
}
