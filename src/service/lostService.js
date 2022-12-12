import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase_config";

export async function addLost_fb(data) {
  try {
    await setDoc(
      doc(firestore, "lost", data.postId),
      { ...data },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllLost_fb() {
  try {
    const allLost = [];
    const reference = collection(firestore, "lost");
    const querySnapshot = await getDocs(reference);
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        allLost.push(doc.data());
      });
      return allLost.reverse();
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}
