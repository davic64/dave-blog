import { create } from "zustand";
import { PostService } from "@/modules/blog/services/PostService";

export const useBlogStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  post: null,
  totalViews: 0,

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
  fetchPost: async (slug) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const post = await postService.getBySlug(slug);
      set({ post, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  incrementViews: async (slug) => {
    const postService = new PostService();
    await postService.incrementViews(slug);
    set((state) => ({
      totalViews: state.totalViews + 1,
    }));
  },
}));
