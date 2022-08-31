import React from 'react'
import '../CSS/Delete.css'
import db from '../Firebase/Firebase'

function Delete() {

    const deletePosts = () => {
        db.collection('posts').get().then(res => res.forEach(doc => {
            doc.ref.delete();
        }))
    }

    return (
        <button className='delete' onClick={deletePosts}>
            <div className='deleteText'>Delete All Posts</div>
        </button>
    )
}

export default Delete