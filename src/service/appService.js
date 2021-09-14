import {fb} from '../config/firebase_config';
import firebase from 'firebase';


export async function onFileChange_fb(event){
  try{
    const file = event.target.files[0];
    const storageRef = fb.storage().ref();
    const fileNameInStorage = createUniqueFileNameInStorage(file);
    const fileRef = storageRef.child(fileNameInStorage);
    await fileRef.put(file);
    return await fileRef.getDownloadURL();
  }catch(error){
    return Promise.reject(error.message);
  }
}

function createUniqueFileNameInStorage(file) {
  return file.name + '_' + firebase.firestore.Timestamp.now().seconds;
}