import React from 'react'
import '../CSS/Delete.css'
import db from '../Firebase/Firebase'
import { firebaseApp } from '../Firebase/Firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

function Delete() {

    const deletePosts = () => {
        db.collection('testPosts').get().then(res => res.forEach(doc => {
            doc.ref.delete();
        }))

        db.collection('testLikes').get().then(res=> res.forEach(doc =>{
            doc.ref.delete();
        }))

        const storageRef = firebaseApp.storage().ref('testPostImages');
        storageRef.listAll().then((listResults) => {
          const promises = listResults.items.map((item) => {
            return item.delete();
          });
          Promise.all(promises);
        });
    }

    const addLikesField = () => {
        db.collection('posts').get().then(res => res.forEach(doc => {
            doc.ref.update({
                postLikes : 0
            });
        }))
    }

    return (
        <button className='delete' onClick={deletePosts}>
            <div className='deleteText'>Delete All Posts</div>
        </button>
    )
}

export default Delete