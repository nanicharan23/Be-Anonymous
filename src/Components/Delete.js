import React from 'react'
import '../CSS/Delete.css'
import db from '../Firebase/Firebase'
import { firebaseApp } from '../Firebase/Firebase';
import { v4 as uuidv4 } from 'uuid';
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

    const addReplyID = () => {
        db.collection('posts').get().then(res => res.forEach(doc => {
            var currentReplies = doc.data().replies
            
            for(var reply of currentReplies){
                Object.assign(reply, {replyId : uuidv4()})
            }
            
            doc.ref.update({
                replies : currentReplies
            })
        }))
    }

    return (
        <button className='delete' onClick={addReplyID}>
            <div className='deleteText'>Add ID's to Replies</div>
        </button>
    )
}

export default Delete