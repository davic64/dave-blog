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

  fetchPost: async (slug) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const posts = await postService.getBySlug(slug);
      set({ post: posts || null, loading: false });
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

  createPost: async (post, file) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const newPost = await postService.create(post, file);
      set((state) => ({ posts: [newPost, ...state.posts], loading: false }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updatePost: async (post, file) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      const updatedPost = await postService.update(post, file);
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === updatedPost.id ? updatedPost : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deletePost: async (id) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      await postService.delete(id);
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  publishPost: async (id) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      await postService.publish(id);
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === id ? { ...p, status: "published" } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  unpublishPost: async (id) => {
    try {
      set({ loading: true, error: null });
      const postService = new PostService();
      await postService.unpublish(id);
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === id ? { ...p, status: "draft" } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
