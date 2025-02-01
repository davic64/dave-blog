import { PostService } from "@/modules/blog/services/PostService";
import { PostCard, PostList } from "@/modules/blog/components";
import { IconFileSmileFilled } from "@tabler/icons-react";

export default async function BlogPage() {
  const postService = new PostService();
  const posts = await postService.getAll();

  if (posts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 animate-fade-in">
        <IconFileSmileFilled size={80} className="animate-bounce" />
        <h1 className="text-4xl font-thin flex items-center gap-2 animate-pulse">
          No hay post
        </h1>
      </div>
    );

  return (
    <div className="space-y-4 p-32">
      <PostCard post={posts[0]} main />
      <PostList posts={posts} />
    </div>
  );
}
