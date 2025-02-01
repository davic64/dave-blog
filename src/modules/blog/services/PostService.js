import { db } from "@/infrastructure/firebase";
import { collection, getDocs } from "firebase/firestore";

export class PostService {
  constructor(collectionName = "posts") {
    this.postCollection = collection(db, collectionName);
  }

  async getAll() {
    const posts = await getDocs(this.postCollection);
    return posts.docs.map((doc) => doc.data());
  }

  async getBySlug(slug) {
    const posts = await getDocs(this.postCollection);
    const post = posts.docs.find((doc) => doc.data().slug === slug);
    return post ? { id: post.id, ...post.data() } : null;
  }
}
