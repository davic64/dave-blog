import { db, storage } from "@/infrastructure/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  getDoc,
} from "firebase/firestore";
import { Post } from "@/core/entities/Post";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import dayjs from "dayjs";

export class PostService {
  constructor() {
    this.postCollection = collection(db, "posts");
    this.viewsCollection = collection(db, "views");
  }

  async getAll() {
    const querySnapshot = await getDocs(this.postCollection);
    return querySnapshot.docs.map(
      (doc) => new Post({ ...doc.data(), id: doc.id })
    );
  }

  async getBySlug(slug) {
    const querySnapshot = await getDocs(
      query(this.postCollection, where("slug", "==", slug))
    );
    const doc = querySnapshot.docs[0];
    return new Post({ ...doc.data(), id: doc.id });
  }

  async getOnlyFive() {
    const querySnapshot = await getDocs(
      query(this.postCollection, orderBy("date", "desc"), limit(5))
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return new Post({
        id: doc.id,
        ...data,
      });
    });
  }

  async create(post, file) {
    const newPost = new Post(post);
    const docRef = await addDoc(this.postCollection, newPost.toJSON());

    if (file) {
      const url = await this.uploadImage(
        file,
        `${docRef.id}.${file.name.split(".").pop()}`
      );
      await updateDoc(docRef, { image: url });
    }

    return { ...newPost, id: docRef.id };
  }

  async update(post, file) {
    const updatedPost = new Post(post);
    const postRef = doc(this.postCollection, post.id);

    if (file) {
      const url = await this.uploadImage(
        file,
        `${post.id}.${file.name.split(".").pop()}`
      );
      updatedPost.image = url;
    }

    await updateDoc(postRef, updatedPost.toJSON());
  }

  async delete(id) {
    // Obtener la referencia del post
    const postRef = doc(this.postCollection, id);

    // Obtener los datos del post antes de eliminarlo
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    // Si el post tiene una imagen, eliminarla del storage
    if (postData?.image) {
      const imageRef = ref(
        storage,
        `posts/${id}.${postData.image.split("?")[0].split(".").pop()}`
      );
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
      }
    }

    // Eliminar el registro de vistas usando directamente el ID del post
    try {
      await deleteDoc(doc(this.viewsCollection, id));
    } catch (error) {
      console.error("Error al eliminar las vistas:", error);
    }

    // Eliminar el post
    await deleteDoc(postRef);
  }

  async publish(id) {
    const postRef = doc(this.postCollection, id);
    await updateDoc(postRef, { status: "published" });
  }

  async unpublish(id) {
    const postRef = doc(this.postCollection, id);
    await updateDoc(postRef, { status: "draft" });
  }

  async uploadImage(file, fileName) {
    const baseName = fileName.split(".").slice(0, -1).join(".");

    const listRef = ref(storage, `posts/`);
    const listResult = await listAll(listRef);

    const existingFiles = listResult.items.filter((item) => {
      const itemBaseName = item.name.split(".").slice(0, -1).join(".");
      return itemBaseName === baseName;
    });

    await Promise.all(existingFiles.map((fileRef) => deleteObject(fileRef)));

    const storageRef = ref(storage, `posts/${fileName}`);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  }

  async getViews() {
    const viewsSnapshot = await getDocs(collection(db, "views"));
    return viewsSnapshot.docs.map((doc) => doc.data());
  }

  async getTotalViewsByMonth() {
    try {
      const viewsSnapshot = await getDocs(collection(db, "views"));

      if (viewsSnapshot.empty) {
        return [];
      }

      // 2. Organizar y sumar las vistas por mes y año
      const viewsByMonth = {};

      viewsSnapshot.docs.forEach((doc) => {
        const { year, month, count } = doc.data();
        const key = `${year}-${month}`;

        if (!viewsByMonth[key]) {
          viewsByMonth[key] = {
            name: dayjs(`${year}-${month}-01`).locale("es").format("MMMM YYYY"),
            views: 0,
          };
        }

        viewsByMonth[key].views += count; // Sumar las vistas de ese mes
      });

      return Object.values(viewsByMonth).sort((a, b) =>
        dayjs(a.name, "MMMM YYYY").diff(dayjs(b.name, "MMMM YYYY"))
      );
    } catch (error) {
      console.error("Error obteniendo vistas totales por mes:", error);
      throw error;
    }
  }
}
