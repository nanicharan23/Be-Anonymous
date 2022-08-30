import React, { useEffect, useState } from 'react'
import Post from '../Components/Post'
import db from '../Firebase/Firebase'


function Feed() {
    const [posts, setPosts] = useState([]) // This is used to set posts.

    // This will get invoked when ever Feed component runs and fetches the posts from database.
    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot =>{
            var listOfPosts = snapshot.docs.map(doc => doc.data())
            setPosts(listOfPosts)
        })
    },[])

  return (
    <div className='feed'>
        {posts.map(post => (
            <Post key={post} name={post.name} content={post.content} timestamp={post.timestamp}></Post>
        ))}
    </div>
  )
}

export default Feed