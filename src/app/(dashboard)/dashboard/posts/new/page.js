"use client";
import { PostForm } from "@/modules/dashboard/components";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const NewPost = () => {
  const { createPost } = useDashboardStore();
  const router = useRouter();

  const handleSubmit = async (post) => {
    try {
      await createPost(post);
      toast.success("Post creado correctamente");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Nuevo Post </p>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPost;
