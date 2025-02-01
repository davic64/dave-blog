import { PostContent } from "@/modules/blog/components";
import { PostService } from "@/modules/blog/services/PostService";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const postService = new PostService();
  const post = await postService.getBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div>
      <PostContent post={post} />
    </div>
  );
}

export async function generateStaticParams() {
  const postService = new PostService();
  const posts = await postService.getAll();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const postService = new PostService();
  const post = await postService.getBySlug(params.slug);

  if (!post) return { title: "Post no encontrado" };

  return {
    title: post.meta.title || post.title,
    description: post.meta.description,
    keywords: post.meta.tags.join(", "),
    openGraph: {
      title: post.meta.title || post.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.createdAt,
      tags: post.meta.tags,
      images: post.meta.image,
    },
  };
}
