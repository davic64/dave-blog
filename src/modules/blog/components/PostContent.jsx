"use client";
import { IconBrandFacebook, IconBrandX, IconLink } from "@tabler/icons-react";
import { PostHead } from "@/modules/blog/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";

export const PostContent = ({ post }) => {
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
        date={dayjs(post.date).locale("es").format("D [de] MMMM [de] YYYY")}
        src={post.image}
        title={post.title}
        tags={post.meta.tags}
      />
      <div className="py-14 px-80">
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
        <hr className="my-14 opacity-30" />
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
