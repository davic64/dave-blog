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
} from "firebase/firestore";
import { Post } from "@/core/entities/Post";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

export class PostService {
  constructor() {
    this.postCollection = collection(db, "posts");
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
    const postRef = doc(this.postCollection, id);
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
}
