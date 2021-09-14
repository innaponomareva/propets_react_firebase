import {fb} from '../config/firebase_config';



export async function addLost_fb({uid, postId, created, photo, nickname, type, sex, breed, color, height, features, description, location, phone, email }){
  
  console.log('addLostService', {uid, postId, created, photo, nickname, type, sex, breed, color, height, features, description, location, phone, email })
  try{
    const ref = await fb.firestore().collection('lost').doc(postId);
    await ref.set({
      uid, 
      postId, 
      created, 
      photo, 
      nickname, 
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

export async function getAllLost_fb(){
  try{
    const allLost = [];
    const querySnapshot = await fb.firestore().collection('lost').orderBy('created').get();
    //console.log(querySnapshot);
    if(querySnapshot){
      querySnapshot.forEach(doc => {
        allLost.push(doc.data());
      });
      return allLost.reverse();
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}