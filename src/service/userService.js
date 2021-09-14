import {fb} from '../config/firebase_config';



export async function addUser_fb({uid, name, email}){
  try{
    const ref = fb.firestore().collection('users').doc(uid);
    await ref.set({
      uid, 
      name, 
      email,
      avatar: '',
      myPet: '',
      nick: '',
      phone: '',
      photo: ''
    }, {merge:true});
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function getUser_fb(uid){
  try{
    const doc = await fb.firestore().collection('users').doc(uid).get();
    if(doc.exists){
      return doc.data();
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function updateUser_fb(uid, update){
  try{
    const ref = fb.firestore().collection('users').doc(uid);
    await ref.update({...update}, {merge:true})
    await getUser_fb(uid)
    .then(data => localStorage.setItem('CURRENT_USER', JSON.stringify(data)))
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function getAllUsers_fb(){
  try{
    const users = [];
    await fb.firestore().collection('users').get()
    .then((querySnapshot) => {
      querySnapshot.forEach( doc => {
        users.push(doc.data());
        //console.log('doc.data', doc.data())
    });
  });
  return users;
  
  }catch(error){
    return Promise.reject(error.message);
  }
}