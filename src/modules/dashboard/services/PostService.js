import { db } from "@/infrastructure/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Post } from "@/core/entities/Post";

export class PostService {
  constructor() {
    this.postCollection = collection(db, "posts");
  }

  async getAll() {
    const querySnapshot = await getDocs(this.postCollection);
    return querySnapshot.docs.map((doc) => new Post({ ...doc.data() }));
  }
}
