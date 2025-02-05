"use client";
import { PostLists } from "@/modules/dashboard/components";
import { Button, EmptyState, Spinner } from "@/ui";
import { IconPlus } from "@tabler/icons-react";
import { useDashboardStore } from "@/stores/dashboardStore";
import Link from "next/link";
import { useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Posts() {
  const { posts, loading, fetchPosts } = useDashboardStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ProtectedRoute>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <Spinner className="w-10 h-10" />
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-2xl">Posts</p>
            <Link href="/dashboard/posts/new">
              <Button variant="gradient">
                <div className="flex items-center gap-2">
                  <IconPlus className="w-4 h-4" />
                  Crear Post
                </div>
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <PostLists posts={posts} />
          )}
        </div>
      ) : (
        <EmptyState
          text="No hay posts"
          className="h-[calc(100vh-80px)]"
          button={
            <Link href="/dashboard/posts/new">
              <Button variant="gradient">
                <div className="flex items-center gap-2">
                  <IconPlus className="w-4 h-4" />
                  Crear Post
                </div>
              </Button>
            </Link>
          }
        />
      )}
    </ProtectedRoute>
  );
}
