import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../config/firebase_config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

export async function getCurrentUserUid_fb() {
  try {
    const auth = await getAuth();
    return auth?.currentUser?.uid;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function login_fb(email, password) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function register_fb(email, password) {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function logout_fb() {
  try {
    await signOut(auth);
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function addUser_fb({ uid, name, email }) {
  try {
    await setDoc(doc(firestore, "users", uid), {
      uid,
      name,
      email,
      avatar: "",
      phone: "",
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updateUser_fb(update) {
  try {
    await setDoc(
      doc(firestore, "users", update.uid),
      {
        ...update,
      },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllUsers_fb() {
  try {
    const users = [];
    const reference = collection(firestore, "users");
    const querySnapshot = await getDocs(reference);
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  } catch (error) {
    return Promise.reject(error.message);
  }
}
