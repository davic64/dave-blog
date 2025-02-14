import { PostService } from "@/modules/blog/services/PostService";
import { notFound } from "next/navigation";
import ClientComponentWrapper from "./ClientComponentWrapper";

export default async function PostPage({ params }) {
  const { slug } = await params;

  if (!slug) return notFound();

  const postService = new PostService();
  const post = await postService.getBySlug(slug, {
    next: { revalidate: 3600 },
  });

  if (!post) return notFound();

  const serializedPost = {
    ...post,
    date: post.date?.seconds ? post.date.seconds * 1000 : Date.now(),
  };

  return <ClientComponentWrapper post={serializedPost} slug={slug} />;
}

export async function generateStaticParams() {
  const postService = new PostService();
  const posts = await postService.getAllPublished();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const postService = new PostService();
  const post = await postService.getBySlug(slug, {
    next: { tags: ["metadata"] },
  });

  if (!post) return { title: "Post no encontrado" };

  console.log(post);

  const metadata = {
    title: post.meta.title || post.title,
    description: post.meta.seoDescription,
    keywords: post.meta.tags?.join(", ") || "",
    openGraph: {
      title: post.meta.title || post.title,
      description: post.meta.seoDescription,
      type: "article",
      publishedTime: post.date?.toDate?.()?.toISOString(),
      tags: post.meta.tags || [],
      images: [
        {
          url: post.image || "",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title || post.title,
      description: post.meta.seoDescription,
      images: [post.image || ""],
    },
  };

  return metadata;
}
