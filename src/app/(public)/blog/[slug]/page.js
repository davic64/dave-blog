import { PostContent } from "@/modules/blog/components";
import { PostService } from "@/modules/blog/services/PostService";
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  if (!params?.slug) return notFound();

  const postService = new PostService();
  const post = await postService.getBySlug(params.slug);

  if (!post) return notFound();

  const serializedPost = {
    ...post,
    date: post.date?.seconds ? post.date.seconds * 1000 : new Date().getTime(),
  };

  return (
    <div className="space-y-6">
      <PostContent post={serializedPost} />
    </div>
  );
}

export async function generateStaticParams() {
  const postService = new PostService();
  const posts = await postService.getAllPublished();
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
      publishedTime: post.date.toDate().toISOString(),
      tags: post.meta.tags,
      images: post.meta.image,
    },
  };
}
