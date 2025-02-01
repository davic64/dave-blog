import { auth } from "@/infrastructure/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "@/core/entities/User";

export class AuthService {
  static async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return new User(userCredential.user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static onAuthStateChanged(callback) {
    return auth.onAuthStateChanged((user) => {
      callback(user ? new User(user) : null);
    });
  }
}
