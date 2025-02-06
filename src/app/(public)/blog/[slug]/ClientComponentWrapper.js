"use client";
import { useBlogStore } from "@/stores/blogStore";
import { useEffect } from "react";
import { PostContent } from "@/modules/blog/components";

export default function ClientComponentWrapper({ post, slug }) {
  const { incrementViews, fetchPost } = useBlogStore();

  useEffect(() => {
    fetchPost(slug);
    incrementViews(slug);
  }, [fetchPost, incrementViews, slug]);

  return (
    <div className="space-y-6">
      <PostContent post={post} />
    </div>
  );
}
