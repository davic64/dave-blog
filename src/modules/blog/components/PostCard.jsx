import { Card } from "@/ui";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Link from "next/link";

export const PostCard = ({ post, main = false }) => {
  return !main ? (
    <Link href={`/blog/${post.slug}`}>
      <Card className="w-full h-[30rem] p-0 rounded-3xl relative cursor-pointer">
        <img
          className="w-full h-full object-cover absolute top-0 left-0"
          src={post.image}
          alt={post.title}
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/40 group hover:bg-black/60 transition-all duration-500">
          <div className="absolute bottom-14 left-14 group-hover:bottom-20 transition-all duration-500">
            <p className="text-sm text-white">
              {dayjs(post.date.toDate())
                .locale("es")
                .format("D [de] MMMM [de] YYYY")}
            </p>
            <h1 className="text-4xl font-bold text-white">{post.title}</h1>
            <div className="flex items-center gap-2 mt-4 select-none">
              {post.meta.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-xs text-white bg-white/10 backdrop-blur-[0.2rem] px-2 py-1 rounded-full font-light shadow-sm"
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
      <Card className="w-full h-[30rem] p-0 rounded-3xl relative cursor-pointer">
        <img
          className="w-full h-full object-cover absolute top-0 left-0"
          src={post.image}
          alt={post.title}
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-black/40 group hover:bg-black/60 transition-all duration-500">
          <div className="absolute bottom-14 left-14 group-hover:bottom-20 transition-all duration-500">
            <p className="text-sm text-white">
              {dayjs(post.date.toDate())
                .locale("es")
                .format("D [de] MMMM [de] YYYY")}
            </p>
            <h1 className="text-6xl font-bold text-white">{post.title}</h1>
            <div className="flex items-center gap-2 mt-4 select-none">
              {post.meta.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-xs text-white bg-white/10 backdrop-blur-[0.2rem] px-2 py-1 rounded-full font-light"
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
