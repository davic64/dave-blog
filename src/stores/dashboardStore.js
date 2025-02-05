import { create } from "zustand";
import { PostService } from "@/modules/dashboard/services/PostService";
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

  fetchOnlyFive: async () => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const posts = await postService.getOnlyFive();
      set({ posts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  createPost: async (post) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const newPost = await postService.create(post);
      set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
