import React,{useState, useEffect} from 'react'
import '../CSS/Profile.css'
import Post from '../Components/Post'
import {firebaseApp} from '../Firebase/Firebase'   
import db from '../Firebase/Firebase'
import VerifiedIconLogo from '../Images/VerifiedIcon.png'
import { getAuth, updateProfile } from 'firebase/auth'
import imageCompression from 'browser-image-compression'
import {v4} from 'uuid'

function Profile() {
    const [posts, setPosts] = useState([]) // This is used to set posts.

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [displayPicture, setDisplayPicture] = useState("")
    const [postsCount, setPostsCount] = useState(0)

    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user!=null){
            setName(user.displayName)
            setEmail(user.email)
            setDisplayPicture(user.photoURL)
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


    const updateDisplayPicture = async (e) => {
        const image = e.target.files[0]
        
        if(image==null) return

        const compressionOptions = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }

        const compressedImage = await imageCompression(image, compressionOptions);
        const compressedImageName = compressedImage.name + v4()

        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child(`displayPictures/${compressedImageName}`)
        await fileRef.put(compressedImage)

        const auth = getAuth();
        updateProfile(auth.currentUser, {
            photoURL : await fileRef.getDownloadURL()
        }).then(()=>{
            console.log("Display Picture Updated!!");
        }).catch((error)=>{
            console.log("Display Picture Update Failed!!"+error);
        })
    }
    
  return (
    <div className='profile container middle'>
        <div className='info'>
            <img src={displayPicture == null ? 'https://cdn-icons-png.flaticon.com/512/1051/1051127.png': displayPicture} className='profile-profileIcon'/>
            <div>
                <div className='profileHeading'>Anonymous ID</div>
                <div className='profileDetails'>{name} <img className="verifiedIcon" src={VerifiedIconLogo}/></div>
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
            displayPicture={displayPicture}
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