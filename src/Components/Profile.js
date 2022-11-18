import React,{useState, useEffect} from 'react'
import '../CSS/Profile.css'
import Post from '../Components/Post'
import {firebaseApp} from '../Firebase/Firebase'   
import db from '../Firebase/Firebase'
function Profile() {
    const [posts, setPosts] = useState([]) // This is used to set posts.

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [postsCount, setPostsCount] = useState(0)

    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user!=null){
            setName(user.displayName)
            setEmail(user.email)
        }
    })

    // This will get invoked when ever Feed component runs and fetches the posts from database.
    useEffect(()=>{
        db.collection('posts').orderBy('secondPosted','desc').onSnapshot(snapshot => {
            
            var listOfPosts = snapshot.docs.map(doc => doc.data()).filter(doc=> doc.name == name)
            setPostsCount(listOfPosts.length)
            setPosts(listOfPosts)
        })
    },[posts,postsCount,email, name])

  return (
    <div className='profile container middle'>
        <div className='info'>
            <img src='https://cdn-icons-png.flaticon.com/512/1051/1051127.png' className='profile-profileIcon'/>
            <div>
                <div className='profileHeading'>Anonymous ID</div>
                <div className='profileDetails'>{name}</div>
            </div>
            <div>
                <div className='profileHeading'>Email</div>
                <div className='profileDetails'>{email}</div>
            </div>
            <div>
                <div className='profileHeading'>Posts</div>
                <div className='profileDetails'>{postsCount}</div>
            </div>
        </div>

        <div className='feed'>
        {posts.length == 0 && 
            <div className='noPosts'>No Posts</div>
        }

        {posts.map((post, index) => (
            <Post 
            key={index} 
            name={post.name} 
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
    </div>
  )
}

export default Profile