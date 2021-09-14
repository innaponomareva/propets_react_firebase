import {fb} from '../config/firebase_config';
import { addUser_fb } from './userService';

export async function login_fb(email, password){
  try{
    const response = await fb.auth().signInWithEmailAndPassword(email,password);
    localStorage.setItem('LOCAL_ID', response.user.uid);
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function register_fb(name, email, password){
  try{
    const response = await fb.auth().createUserWithEmailAndPassword(email,password);
    await fb.firestore().collection('users');
    addUser_fb({uid: response.user.uid, name, email});
    localStorage.setItem('LOCAL_ID', response.user.uid);
  }catch(error){
    return Promise.reject(error.message);
  }
};

export async function logout_fb(){
  try{
    localStorage.removeItem('LOCAL_ID');
    await fb.auth().signOut();
  }catch(error){
    return Promise.reject(error.message);
  }
}