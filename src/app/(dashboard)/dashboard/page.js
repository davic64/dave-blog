"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, Spinner } from "@/ui";
import { IconEye, IconFile, IconFileDots } from "@tabler/icons-react";
import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useEffect, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Image from "next/image";

export default function Dashboard() {
  const { posts, loading, fetchOnlyFive, fetchViewsByMonth, viewsByMonth } =
    useDashboardStore();

  // Memoized calculations
  const totalViews = useMemo(
    () => posts.reduce((acc, post) => acc + post.views, 0),
    [posts]
  );
  const publishedPosts = useMemo(
    () => posts.filter((post) => post.status === "published").length,
    [posts]
  );
  const draftPosts = useMemo(
    () => posts.filter((post) => post.status === "draft").length,
    [posts]
  );

  // Memoized posts list
  const memoizedPosts = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        formattedDate: dayjs(post.date.toDate())
          .locale("es")
          .format("D [de] MMMM [de] YYYY"),
      })),
    [posts]
  );

  // Callbacks for fetching data
  const fetchData = useCallback(() => {
    fetchOnlyFive();
    fetchViewsByMonth();
  }, [fetchOnlyFive, fetchViewsByMonth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized chart data
  const chartContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <Spinner />
        </div>
      );
    }
    return viewsByMonth.length > 0 ? (
      <AreaChart width={1080} height={300} data={viewsByMonth}>
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
    ) : (
      <p className="text-gray-500">No hay datos disponibles</p>
    );
  }, [loading, viewsByMonth]);

  // Memoized posts content
  const postsContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <Spinner />
        </div>
      );
    }
    return memoizedPosts.length > 0 ? (
      <div className="flex flex-col gap-4">
        {memoizedPosts.map((post, index) => (
          <div key={post.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    quality={80}
                    priority={post.status === "published"}
                  />
                </div>
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconEye size={16} className="text-gray-500" />
                <p className="text-sm text-gray-500">{post.views}</p>
              </div>
            </div>
            {index < memoizedPosts.length - 1 && (
              <hr className="border-gray-800" />
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No hay posts disponibles</p>
    );
  }, [loading, memoizedPosts]);

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
            <p className="text-2xl font-bold">{totalViews}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconFile size={16} className="text-gray-500" />
              <p className="text-sm text-gray-500">Posts Publicados</p>
            </div>
            <p className="text-2xl font-bold">{publishedPosts}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconFileDots size={16} className="text-gray-500" />
              <p className="text-sm text-gray-500">Borradores</p>
            </div>
            <p className="text-2xl font-bold">{draftPosts}</p>
          </Card>
        </div>
        <Card className="p-8 space-y-4">
          <p className="text-lg font-bold">Vistas por Mes</p>
          {chartContent}
        </Card>
        <Card className="px-8 space-y-4">
          <p className="text-lg font-bold">Posts Recientes</p>
          {postsContent}
        </Card>
      </div>
    </ProtectedRoute>
  );
}
