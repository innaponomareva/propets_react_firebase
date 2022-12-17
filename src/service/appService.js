import {
  ref,
  uploadBytes,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { storage, firestore } from "../config/firebase_config";

export async function onFileChange_fb(event, { directory }) {
  const file = event.target.files[0];
  const fileName = createUniqueFileNameInStorage(file); // Create a unique file name in storage
  const pathReference = ref(storage, `${directory}/${fileName}`);
  try {
    await uploadBytes(pathReference, file);
    return {
      fileUrl: await getDownloadURL(pathReference),
      fileNameInStorage: fileName,
    };
  } catch (error) {
    console.log("error ", error.message);
    return Promise.reject(error.message);
  }
}

export async function cleanStorage_fb(directory) {
  try {
    const allFileNamesInFirestore = await getAllFileNamesInFirestore(directory);
    const allFileNamesInStorage = await getAllFileNamesInStorage(directory);
    const combined = allFileNamesInFirestore.concat(allFileNamesInStorage);
    const obj = checkIfFileNameExistsTwiceOrOnce(combined);
    const junkFiles = await getJunkFiles(obj);

    if (junkFiles.length > 0) {
      console.log("junkFiles", junkFiles);
      junkFiles.forEach((item) => {
        const pathReference = ref(storage, `${directory}/${item.name}`);
        deleteObject(pathReference);
      });
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
}

function createUniqueFileNameInStorage(file) {
  return file.name + "_" + Timestamp.now().seconds;
}

function getJunkFiles(obj) {
  return Object.values(obj).filter((item) => item === 1);
}

function checkIfFileNameExistsTwiceOrOnce(combined) {
  // if twice => ++ => these are files in use
  // if once => these are junk files
  const obj = {};
  for (let i = 0; i < combined.length; i++) {
    if (obj[combined[i]]) {
      obj[combined[i]]++;
    } else if (!obj[combined[i]] && combined[i] !== undefined) {
      obj[combined[i]] = 1;
    }
  }
  return obj;
}

async function getAllFileNamesInStorage(directory) {
  const allFileNamesInStorage = [];
  const dirRef = ref(storage, directory);
  try {
    const list = await listAll(dirRef);
    list.items.forEach((itemRef) => {
      allFileNamesInStorage.push(itemRef.name);
    });
    return allFileNamesInStorage;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

async function getAllFileNamesInFirestore(directory) {
  const reference = collection(firestore, directory);
  const allFileNamesInFirestore = [];
  try {
    const querySnapshot = await getDocs(reference);
    querySnapshot.forEach((doc) => {
      allFileNamesInFirestore.push(doc.data().fileNameInStorage);
    });
    return allFileNamesInFirestore;
  } catch (error) {
    return Promise.reject(error.message);
  }
}
