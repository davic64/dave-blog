"use client";
import { Button, Input, Spinner } from "@/ui";
import { useState, useMemo, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";
import { IconUpload } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export const PostForm = ({ post, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    image: post?.image || "",
    meta: {
      tags: post?.meta?.tags || "",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Memoized form data handlers
  const handleTitleChange = useCallback(
    (e) => setFormData((prev) => ({ ...prev, title: e.target.value })),
    []
  );

  const handleContentChange = useCallback(
    (value) => setFormData((prev) => ({ ...prev, content: value })),
    []
  );

  const handleTagsChange = useCallback(
    (e) =>
      setFormData((prev) => ({
        ...prev,
        meta: { ...prev.meta, tags: e.target.value },
      })),
    []
  );

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e, isDraft = false) => {
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
            if (isDraft) {
              await onSubmit(
                { ...updatedFields, status: "draft" },
                selectedFile
              );
              return;
            } else if (post.status === "draft") {
              await onSubmit(
                { ...updatedFields, status: "published" },
                selectedFile
              );
              return;
            }
            toast.error("No hay cambios para actualizar");
            return;
          }
        }

        await onSubmit(updatedFields, selectedFile);
      } catch (error) {
        console.error("Error al actualizar el post:", error);
      }
    },
    [formData, post, selectedFile, onSubmit]
  );

  // Memoized image source
  const imageSrc = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : formData.image),
    [selectedFile, formData.image]
  );

  // Memoized button disabled state
  const isPublishDisabled = useMemo(
    () =>
      !formData.title ||
      !formData.content ||
      !formData.meta.tags ||
      (!post && !selectedFile) ||
      loading,
    [formData, post, selectedFile, loading]
  );

  return (
    <div className="space-y-4">
      <Input
        className="w-full"
        placeholder="Title"
        value={formData.title}
        onChange={handleTitleChange}
      />
      <MDEditor
        height={400}
        preview="edit"
        value={formData.content}
        onChange={handleContentChange}
      />
      <Input
        className="w-full"
        placeholder="Tags (separados por comas)"
        value={formData.meta.tags}
        onChange={handleTagsChange}
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
            onChange={handleFileChange}
          />
        </label>
        {imageSrc && (
          <div className="w-full h-[45rem] relative rounded-lg overflow-hidden mt-4">
            <Image
              src={imageSrc}
              alt="Imagen del post"
              fill
              className="object-cover"
              quality={80}
              unoptimized={!!selectedFile}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={(e) => handleSubmit(e, false)}
          borderColor="primary"
          disabled={isPublishDisabled}
        >
          {loading ? (
            <Spinner />
          ) : post ? (
            post.status === "published" ? (
              "Actualizar"
            ) : (
              "Publicar"
            )
          ) : (
            "Publicar"
          )}
        </Button>
        <Button
          variant="warning"
          className="w-full flex items-center justify-center gap-2"
          type="button"
          borderColor="warning"
          onClick={(e) => handleSubmit(e, true)}
        >
          {loading ? (
            <Spinner />
          ) : post ? (
            post.status === "draft" ? (
              "Guardar borrador"
            ) : (
              "Guardar como borrador"
            )
          ) : (
            "Guardar como borrador"
          )}
        </Button>
      </div>
    </div>
  );
};
