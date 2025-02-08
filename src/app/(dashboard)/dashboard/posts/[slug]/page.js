"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useMemo } from "react";
import { use } from "react";
import { PostForm } from "@/modules/dashboard/components";
import { useDashboardStore } from "@/stores/dashboardStore";
import ProtectedRoute from "@/components/ProtectedRoute";
import { toast } from "react-hot-toast";
import { Spinner, EmptyState } from "@/ui";

export default function UpdatePost({ params }) {
  const router = useRouter();
  const { post, loading, updatePost, fetchPost } = useDashboardStore();
  const slug = use(params).slug;

  // Memoized fetch function
  const memoizedFetchPost = useCallback(() => {
    fetchPost(slug);
  }, [fetchPost, slug]);

  useEffect(() => {
    memoizedFetchPost();
  }, [memoizedFetchPost]);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (post, file) => {
      try {
        if (!post) {
          throw new Error("El post no puede estar vacío");
        }
        await updatePost(post, file);
        router.push("/dashboard/posts");
        toast.success("Post actualizado correctamente");
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error(error.message || "Error al actualizar el post");
      }
    },
    [updatePost, router]
  );

  // Memoized main content
  const mainContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-10 h-10" />
        </div>
      );
    }
    return post ? (
      <PostForm post={post} onSubmit={handleSubmit} />
    ) : (
      <EmptyState
        text="No se encontró el post"
        className="h-[calc(100vh-80px)]"
      />
    );
  }, [loading, post, handleSubmit]);

  return <ProtectedRoute>{mainContent}</ProtectedRoute>;
}
