import { create } from "zustand";
import { PostService } from "@/modules/blog/services/PostService";

export const useBlogStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const posts = await postService.getAllPublished();
      set({ posts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
