import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { storage, firestore } from "../config/firebase_config";
import { ref, deleteObject } from "firebase/storage";

export async function addPet_fb({ uid, id }) {
  try {
    await setDoc(doc(firestore, "pets", id), {
      uid,
      id,
      fileNameInStorage: "",
      avatar: "",
      type: "",
      nick: "",
      sex: "",
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function updatePet_fb(update) {
  try {
    await setDoc(
      doc(firestore, "pets", update.id),
      {
        ...update,
      },
      { merge: true }
    );
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export async function getAllPets_fb() {
  const reference = collection(firestore, "pets");
  const pets = [];
  try {
    const querySnapshot = await getDocs(reference);
    querySnapshot.forEach((doc) => {
      pets.push(doc.data());
    });
    //console.log("pets__service", pets);
    return pets;
  } catch (error) {
    //console.log("error__service", error.message);
    return Promise.reject(error.message);
  }
}

export async function deletePet_fb(id, fileNameInStorage) {
  const petDoc = doc(firestore, "pets", id);
  const pathRef = ref(storage, `pets/${fileNameInStorage}`);
  console.log("pet", petDoc);
  try {
    await deleteDoc(petDoc);
    await deleteObject(pathRef);
  } catch (error) {
    console.log("error", error.message);
    return Promise.reject(error.message);
  }
}
