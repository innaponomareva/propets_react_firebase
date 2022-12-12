import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase_config";

export async function addPost_fb(data) {
  try {
    await setDoc(doc(firestore, "posts", data.postId), {
      ...data,
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllPosts_fb() {
  const reference = collection(firestore, "posts");
  const posts = [];
  try {
    const querySnapshot = await getDocs(reference);
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    return posts.reverse();
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function addLike_fb(postId, uid) {
  const postRef = doc(firestore, "posts", postId);
  try {
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const post = docSnap.data();
      const likes = [...post.likes];
      likes.push(uid);
      await setDoc(
        doc(firestore, "posts", postId),
        {
          likes: likes,
        },
        { merge: true }
      );
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function deleteLike_fb(postId, uid) {
  const postRef = doc(firestore, "posts", postId);
  try {
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const post = docSnap.data();
      const likes = [...post.likes];
      const newLikes = likes.filter((item) => item !== uid);
      await setDoc(
        doc(firestore, "posts", postId),
        {
          likes: newLikes,
        },
        { merge: true }
      );
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function addComment_fb(data) {
  const postRef = doc(firestore, "posts", data.postId);
  try {
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const post = docSnap.data();
      const comments = [...post.comments];
      comments.push(data);
      await setDoc(
        doc(firestore, "posts", data.postId),
        {
          comments: comments,
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log("error", error.message);
    return Promise.reject(error.message);
  }
}
