import { db } from "@/infrastructure/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export class PostService {
  constructor() {
    this.postCollection = collection(db, "posts");
  }

  async getAllPublished() {
    const posts = await getDocs(this.postCollection);
    return posts.docs
      .filter((doc) => doc.data().status === "published")
      .map((doc) => doc.data());
  }

  async getBySlug(slug) {
    const posts = await getDocs(this.postCollection);
    const post = posts.docs.find((doc) => doc.data().slug === slug);
    return post ? { id: post.id, ...post.data() } : null;
  }

  async getTotalViews() {
    const posts = await this.getAllPublished();
    return posts.reduce((acc, post) => acc + post.views, 0);
  }

  async incrementViews(slug) {
    const post = await this.getBySlug(slug);
    if (post) {
      post.views++;
      await updateDoc(doc(this.postCollection, post.id), { views: post.views });
    }
  }
}
