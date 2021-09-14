import {fb} from '../config/firebase_config';

export async function addPost_fb({uid, postId, created, date, title, text, postImg, petAvatar, petName = 'Anonym', likes, comments} = {}){
  try{
    const ref = await fb.firestore().collection('posts').doc(postId);
    await ref.set({
        uid, postId, date, 
        created, title, text, 
        postImg, petAvatar, 
        petName, likes, comments },
    {merge: true})
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function getPost_fb(postId){
  try{
    const doc = await fb.firestore().collection('posts').doc(postId).get();
    if(doc.exists){
      return doc.data();
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function getAllPosts_fb(){
  try{
    const posts = [];
    await fb.firestore().collection('posts').orderBy('created').get()
    .then((querySnapshot) => {
      querySnapshot.forEach( doc => {
        posts.push(doc.data());
        //console.log('doc.data', doc.data())
    });
  });
  return posts.reverse();
  
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function addLike_fb(postId, count, uid){
  try{
    const ref = await fb.firestore().collection('posts').doc(postId);
    const doc = await ref.get();
    if(doc.exists){
      const post = doc.data();
      const likers = [...post.likes.whoLiked];
      likers.push(uid);
      await ref.update({...post,
        likes: { count: count + 1, 
                 whoLiked: likers}},{merge:true})
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function deleteLike_fb(postId, count, uid){
  try{
    const ref = await fb.firestore().collection('posts').doc(postId);
    const doc = await ref.get();
    if(doc.exists){
      const post = doc.data();
      const likers = [...post.likes.whoLiked];
      const index = likers.findIndex(item => item === uid);
      likers.splice(index, 1);
      await ref.update({...post,
        likes: { count: count - 1, 
                 whoLiked: likers}},{merge:true})
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}

export async function addComment_fb({postId, commentId, uid, petName, date, text}){
  try{
    const ref = await fb.firestore().collection('posts').doc(postId);
    const doc = await ref.get();
    if(doc.exists){
      const post = doc.data();
      const comments = [...post.comments];
      comments.push({postId, commentId, uid, petName, date, text});
      await ref.update({...post,
        comments: comments }, {merge:true})
    }
  }catch(error){
    return Promise.reject(error.message);
  }
}
