import React, { useEffect, useState } from 'react'

import Post from '../Components/Post'
import db from '../Firebase/Firebase'
import '../CSS/Feed.css'

import LinearProgress from '@mui/material/LinearProgress';

function Feed() {

    const [posts, setPosts] = useState([]) // This is used to set posts.

    // This will get invoked when ever Feed component runs and fetches the posts from database.
    useEffect(()=>{
        db.collection('posts').limit(20).orderBy('secondPosted','desc').onSnapshot(snapshot => {
            var listOfPosts = snapshot.docs.map(doc => doc.data())
            setPosts(listOfPosts)
        })
    },[])
    
  return (
    <div className='feed'>
        {posts.length == 0 && 
            <div className='noPosts'>
                <div>Loading..</div>
                <LinearProgress color="inherit" />
            </div>
        }

        {posts.map((post, index) => (
            <Post 
            key={index} 
            name={post.name} 
            displayPicture={post.displayPicture}
            content={post.content} 
            timestamp={post.timestamp} 
            fileUrl={post.fileUrl}
            postId={post.postId}
            replies={post.replies}
            secondPosted={post.secondPosted}
            likes={post.postLikes}
            ></Post>
        ))}
    </div>
  )
}

export default Feed