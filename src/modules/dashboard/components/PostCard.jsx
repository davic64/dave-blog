"use client";
import { Button, Card } from "@/ui";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { IconFile, IconClock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/stores/dashboardStore";
import Image from "next/image";

const statusLabels = {
  draft: {
    label: "Borrador",
    color: "bg-secondary-500",
    icon: <IconClock className="w-3 h-3" />,
  },
  published: {
    label: "Publicado",
    color: "bg-primary-600",
    icon: <IconFile className="w-3 h-3" />,
  },
};

export const PostCard = ({ post }) => {
  const router = useRouter();
  const { deletePost } = useDashboardStore();
  return (
    <Card className="w-full h-[16rem] p-0 rounded-3xl relative select-none">
      <Image
        className="w-full h-full object-cover absolute top-0 left-0"
        src={post.image}
        alt={post.title}
        fill
        quality={80}
        priority={post.status === "published"}
      />
      <div className="absolute bottom-0 left-0 w-full h-full bg-black/40 group hover:bg-black/60 transition-all duration-500">
        <div className="absolute top-6 right-6 z-10">
          <div
            className={`backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
              statusLabels[post.status].color
            }`}
          >
            {statusLabels[post.status].icon}
            {statusLabels[post.status].label}
          </div>
        </div>
        <div className="absolute bottom-14 left-10 group-hover:bottom-20 transition-all duration-500 ">
          <p className="text-sm text-white">
            {dayjs(post.date.toDate())
              .locale("es")
              .format("D [de] MMMM [de] YYYY")}
          </p>
          <p className="text-2xl font-bold text-white">{post.title}</p>
        </div>
        <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 space-x-2">
          <Button
            variant="warning"
            size="sm"
            onClick={() => router.push(`/dashboard/posts/${post.slug}`)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deletePost(post.id)}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};
