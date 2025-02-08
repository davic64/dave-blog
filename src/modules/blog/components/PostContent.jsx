"use client";
import { IconBrandFacebook, IconBrandX, IconLink } from "@tabler/icons-react";
import { PostHead } from "@/modules/blog/components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";

export const PostContent = ({ post }) => {
  // Convertir el valor serializado de vuelta a una fecha
  const postDate = new Date(post.date);

  const handleShare = (platform) => {
    const currentUrl = window.location.href;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}`,
      copy: null,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(currentUrl);
      alert("¡Enlace copiado al portapapeles!");
      return;
    }

    window.open(shareUrls[platform], "_blank");
  };

  return (
    <div className="space-y-6">
      <PostHead
        date={dayjs(postDate).locale("es").format("D [de] MMMM [de] YYYY")}
        src={post.image}
        title={post.title}
        tags={post.meta.tags}
      />
      <div className="py-8 px-10 sm:py-12 sm:px-8 md:py-14 md:px-20 lg:px-40 xl:px-80">
        <div className="flex items-center justify-center text-center gap-4">
          <IconBrandFacebook
            className="cursor-pointer"
            onClick={() => handleShare("facebook")}
          />
          <IconBrandX
            className="cursor-pointer"
            onClick={() => handleShare("twitter")}
          />
          <IconLink
            className="cursor-pointer"
            onClick={() => handleShare("copy")}
          />
        </div>
        <hr className="my-8 sm:my-10 md:my-12 lg:my-14 opacity-30" />
        <div className="prose dark:prose-invert max-w-none">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-3"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold mb-2"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-lg mb-4 leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-500 hover:underline" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc pl-4 sm:pl-6 md:pl-8 mb-4"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pl-4 sm:pl-6 md:pl-8 mb-4"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gray-300 pl-4 italic mb-4"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-100 dark:bg-gray-800 p-1 rounded"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto"
                  {...props}
                />
              ),
              img: ({ node, ...props }) => (
                <img className="max-w-full h-auto mb-4 rounded-lg" {...props} />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
};
