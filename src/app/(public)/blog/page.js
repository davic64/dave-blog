"use client";
import { useEffect } from "react";
import { PostCard, PostList } from "@/modules/blog/components";
import { IconFileSmileFilled } from "@tabler/icons-react";
import { useBlogStore } from "@/stores/blogStore";
import { Spinner } from "@/ui";
export default function BlogPage() {
  const { posts, fetchPosts, loading } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="w-10 h-10" />
    </div>
  ) : posts.length > 0 ? (
    <div className="space-y-4 p-32">
      <PostCard post={posts[0]} main />
      <PostList posts={posts} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen gap-4 animate-fade-in">
      <IconFileSmileFilled size={80} className="animate-bounce" />
      <h1 className="text-4xl font-thin flex items-center gap-2 animate-pulse">
        No hay posts
      </h1>
    </div>
  );
}
