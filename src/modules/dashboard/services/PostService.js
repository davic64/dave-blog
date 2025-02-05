import { db } from "@/infrastructure/firebase";
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
} from "firebase/firestore";
import { Post } from "@/core/entities/Post";

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
    return querySnapshot.docs.map(
      (doc) => new Post({ ...doc.data(), id: doc.id })
    );
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

  async create(post) {
    const newPost = new Post(post);
    const docRef = await addDoc(this.postCollection, newPost.toJSON());
    return { ...newPost, id: docRef.id };
  }
}
