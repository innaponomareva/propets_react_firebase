import {fb} from '../config/firebase_config';


export async function addFound_fb({uid, postId, created, photo, type, sex, breed, color, height, features, description, location, phone, email }){
  try{
    const ref = await fb.firestore().collection('found').doc(postId);
    await ref.set({
      uid, 
      postId, 
      created, 
      photo, 
      type, 
      sex, 
      breed, 
      color, 
      height, 
      features, 
      description, 
      location, 
      phone, 
      email 
    }, {merge: true})
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function getAllFound_fb(){
  try{
    const allFound = [];
    const querySnapshot = await fb.firestore().collection('found').orderBy('created').get();
    //console.log(querySnapshot);
    if(querySnapshot){
      querySnapshot.forEach(doc => {
        allFound.push(doc.data());
      });
      return allFound.reverse();
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}