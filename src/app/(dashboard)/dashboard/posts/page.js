"use client";
import { PostLists } from "@/modules/dashboard/components";
import { Button, EmptyState, Spinner } from "@/ui";
import { IconPlus } from "@tabler/icons-react";
import { useDashboardStore } from "@/stores/dashboardStore";
const Posts = () => {
  const { posts, loading } = useDashboardStore();

  return posts.length > 0 ? (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-2xl">Posts</p>
        <Button variant="gradient">
          <div className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Crear Post
          </div>
        </Button>
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
        <Button variant="gradient">
          <div className="flex items-center gap-2">
            <IconPlus className="w-4 h-4" />
            Crear Post
          </div>
        </Button>
      }
    />
  );
};

export default Posts;
