"use client";
import { useBlogStore } from "@/stores/blogStore";
import { useEffect, useCallback, useMemo } from "react";
import { PostContent } from "@/modules/blog/components";

export default function ClientComponentWrapper({ post, slug }) {
  const { incrementViews, fetchPost } = useBlogStore();

  const updatePostData = useCallback(async () => {
    try {
      await Promise.all([fetchPost(slug), incrementViews(slug)]);
    } catch (error) {
      console.error("Error updating post data:", error);
    }
  }, [fetchPost, incrementViews, slug]);

  useEffect(() => {
    updatePostData();
  }, [updatePostData]);

  const postContent = useMemo(() => <PostContent post={post} />, [post]);

  return <div className="space-y-6">{postContent}</div>;
}
