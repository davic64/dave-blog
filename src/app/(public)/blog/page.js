"use client";
import { useEffect, useCallback, useMemo, useState, memo } from "react";
import { PostCard, PostList } from "@/modules/blog/components";
import { useBlogStore } from "@/stores/blogStore";
import { EmptyState, Spinner } from "@/ui";

const MemoizedPostCard = memo(PostCard);
const MemoizedPostList = memo(PostList);

export default function BlogPage() {
  const { posts, fetchPosts, loading } = useBlogStore();
  const [initialLoad, setInitialLoad] = useState(true);

  // Memoizar la función de fetchPosts
  const fetchPostsMemoized = useCallback(() => {
    fetchPosts().finally(() => setInitialLoad(false));
  }, [fetchPosts]);

  useEffect(() => {
    fetchPostsMemoized();
  }, [fetchPostsMemoized]);

  // Memoizar el contenido principal
  const mainContent = useMemo(() => {
    if (initialLoad || loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="w-10 h-10" />
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <EmptyState text="No hay posts" className="h-[calc(100vh-80px)]" />
      );
    }

    return (
      <div className="space-y-4 px-4 md:px-8 lg:px-16 xl:px-32 py-8 mt-20">
        <MemoizedPostCard post={posts[0]} main key={posts[0].id} />
        <MemoizedPostList posts={posts} />
      </div>
    );
  }, [loading, posts, initialLoad]);

  return mainContent;
}
