"use client";
import { Button, Input } from "@/ui";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { IconUpload } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

export const PostForm = ({ post, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    image: post?.image || "",
    meta: {
      tags: post?.meta?.tags || "",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    try {
      const newStatus = isDraft ? "draft" : "published";

      const updatedFields = {
        title: formData.title,
        content: formData.content,
        image: formData.image,
        meta: {
          tags: String(formData.meta.tags || "")
            .split(",")
            .map((tag) => tag.trim()),
        },
        status: newStatus,
        ...(post?.id && { id: post.id }),
        file: selectedFile,
      };

      if (post) {
        const hasChanges =
          formData.title !== post.title ||
          formData.content !== post.content ||
          formData.image !== post.image ||
          selectedFile ||
          JSON.stringify(updatedFields.meta.tags) !==
            JSON.stringify(post.meta?.tags || []);

        if (!hasChanges) {
          toast.error("No hay cambios para actualizar");
          return;
        }
      }

      await onSubmit(updatedFields, selectedFile);
    } catch (error) {
      console.error("Error al actualizar el post:", error);
    }
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
      <div>
        <label className="flex items-center justify-center w-full h-32 px-4 transition bg-gray-800 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:border-primary-500 hover:bg-gray-700/50">
          <div className="flex flex-col items-center justify-center space-y-2">
            <IconUpload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">
              {selectedFile ? selectedFile.name : "Subir imagen"}
            </span>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedFile(file);
              }
            }}
          />
        </label>
        {(formData.image || selectedFile) && (
          <div className="flex justify-center items-center w-full rounded-lg overflow-hidden mt-4">
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : formData.image
              }
              alt="Imagen del post"
              className="w-full h-54 object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          className="w-full"
          onClick={(e) => handleSubmit(e, false)}
          borderColor="primary"
          disabled={
            !formData.title ||
            !formData.content ||
            !formData.meta.tags ||
            (!post && !selectedFile)
          }
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
