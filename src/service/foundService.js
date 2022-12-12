import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase_config";

export async function addFound_fb(data) {
  try {
    await setDoc(
      doc(firestore, "found", data.postId),
      { ...data },
      { merge: true }
    );
  } catch (error) {
    console.log("error", error.message);
    return Promise.reject(error.message);
  }
}

export async function getAllFound_fb() {
  try {
    const allFound = [];
    const reference = collection(firestore, "found");
    const querySnapshot = await getDocs(reference);
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        allFound.push(doc.data());
      });
      return allFound.reverse();
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}
