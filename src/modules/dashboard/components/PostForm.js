"use client";
import { Button, Input } from "@/ui";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export const PostForm = ({ post, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    image: post?.image || "",
    meta: {
      tags: post?.meta?.tags || "",
    },
  });

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    const newStatus = isDraft ? "draft" : "published";
    onSubmit({
      ...formData,
      status: newStatus,
      meta: {
        ...formData.meta,
        tags: formData.meta.tags.split(",").map((tag) => tag.trim()),
      },
    });
  };

  return (
    <div className="space-y-4">
      <Input
        className="w-full"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <MDEditor
        height={400}
        preview="edit"
        value={formData.content}
        onChange={(value) => setFormData({ ...formData, content: value })}
      />
      <Input
        className="w-full"
        placeholder="Tags (separados por comas)"
        value={formData.meta.tags}
        onChange={(e) =>
          setFormData({
            ...formData,
            meta: { ...formData.meta, tags: e.target.value },
          })
        }
      />
      <Input
        className="w-full"
        placeholder="URL de la imagen"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />
      {formData.image && (
        <div className="flex justify-center items-center w-full rounded-lg overflow-hidden">
          <img
            src={formData.image}
            alt="Imagen del post"
            className="w-full h-54 object-cover"
          />
        </div>
      )}
      <div className="flex gap-4">
        <Button
          className="w-full"
          onClick={(e) => handleSubmit(e, false)}
          borderColor="primary"
        >
          {post ? "Actualizar" : "Publicar"} artículo
        </Button>
        <Button
          variant="warning"
          className="w-full"
          type="button"
          borderColor="warning"
          onClick={(e) => handleSubmit(e, true)}
        >
          {post ? "Guardar borrador" : "Guardar como borrador"}
        </Button>
      </div>
    </div>
  );
};
