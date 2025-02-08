import { Card } from "@/ui";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Link from "next/link";
import Image from "next/image";

export const PostCard = ({ post, main = false }) => {
  return !main ? (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full h-[20rem] md:h-[30rem] p-0 rounded-3xl relative cursor-pointer">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority={main}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/40 group hover:bg-black/60 transition-all duration-500">
          <div className="absolute bottom-4 left-4 md:bottom-14 md:left-14 group-hover:bottom-6 md:group-hover:bottom-20 transition-all duration-500">
            <p className="text-base md:text-sm text-white">
              {dayjs(post.date.toDate())
                .locale("es")
                .format("D [de] MMMM [de] YYYY")}
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-4 select-none">
              {post.meta.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-[10px] md:text-xs text-white bg-white/10 backdrop-blur-[0.2rem] px-2 py-1 rounded-full font-light shadow-sm"
                >
                  {tag.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  ) : (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full h-[20rem] md:h-[30rem] p-0 rounded-3xl relative cursor-pointer">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority={main}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/40 group hover:bg-black/60 transition-all duration-500">
          <div className="absolute bottom-4 left-4 md:bottom-14 md:left-14 group-hover:bottom-6 md:group-hover:bottom-20 transition-all duration-500">
            <p className="text-base md:text-sm text-white">
              {dayjs(post.date.toDate())
                .locale("es")
                .format("D [de] MMMM [de] YYYY")}
            </p>
            <h1 className="text-3xl md:text-6xl font-bold text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-4 select-none">
              {post.meta.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-[10px] md:text-xs text-white bg-white/10 backdrop-blur-[0.2rem] px-2 py-1 rounded-full font-light"
                >
                  {tag.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
