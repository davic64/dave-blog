import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const posts = await postService.getAll();
      set({ posts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
