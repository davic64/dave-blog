import { db } from "@/infrastructure/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  increment,
  runTransaction,
} from "firebase/firestore";

export class PostService {
  constructor() {
    this.postCollection = collection(db, "posts");
    this.viewsCollection = collection(db, "views");
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

  async incrementViews(slug) {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      const q = query(this.postCollection, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return;

      const post = querySnapshot.docs[0];
      const postId = post.id;

      const viewsRef = doc(this.viewsCollection, postId);
      const postRef = doc(this.postCollection, postId);

      await runTransaction(db, async (transaction) => {
        transaction.set(
          viewsRef,
          {
            slug,
            year,
            month,
            count: increment(1),
          },
          { merge: true }
        );

        transaction.update(postRef, {
          views: increment(1),
        });
      });

      return true;
    } catch (error) {
      console.error("Error incrementando vistas:", error);
      throw error;
    }
  }
}
