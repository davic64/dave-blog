import { create } from "zustand";
import { PostService } from "@/modules/dashboard/services/PostService";
import dayjs from "dayjs";
import "dayjs/locale/es";

export const useDashboardStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  post: null,
  viewsByMonth: [],

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
          p.id === updatedPost.id 
            ? { ...p, ...updatedPost }
            : p
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

  fetchViewsByMonth: async () => {
    try {
      set({ loading: true, error: null });

      const postService = new PostService();
      const views = await postService.getViews();

      if (!views.length) {
        set({ viewsByMonth: [], loading: false });
        return;
      }

      const viewsByMonth = {};

      views.forEach(({ year, month, count }) => {
        const key = `${year}-${month}`;

        if (!viewsByMonth[key]) {
          viewsByMonth[key] = {
            name: dayjs(`${year}-${month}-01`).locale("es").format("MMMM YYYY"),
            views: 0,
          };
        }

        viewsByMonth[key].views += count;
      });

      const formattedViews = Object.values(viewsByMonth).sort(
        (a, b) =>
          dayjs(a.name, "MMMM YYYY").valueOf() -
          dayjs(b.name, "MMMM YYYY").valueOf()
      );

      set({ viewsByMonth: formattedViews, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
