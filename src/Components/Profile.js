import React,{useState, useEffect} from 'react'
import '../CSS/Profile.css'
import Post from '../Components/Post'
import {firebaseApp} from '../Firebase/Firebase'   
import db from '../Firebase/Firebase'
import VerifiedIconLogo from '../Images/VerifiedIcon.png'
import { getAuth, updateProfile } from 'firebase/auth'
import imageCompression from 'browser-image-compression'
import {v4} from 'uuid'
import LinearProgress from '@mui/material/LinearProgress';

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
        
        // Enables the Progress bar for updating display picture.
        showingUpdatingDisplayPictureLoading(true)

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
        
        const displayPictureUrl = await fileRef.getDownloadURL()

        const auth = getAuth();
        updateProfile(auth.currentUser, {
            photoURL : displayPictureUrl
        }).then(()=>{
            console.log("Display Picture Updated!!");
        }).catch((error)=>{
            console.log("Display Picture Update Failed!!"+error);
        })
        
        // Updates Display Picture for all the existing posts of the current user.
        updatedisplayPictureForCurrentUserPosts(auth.currentUser.displayName,displayPictureUrl);

        // Remove the Progress bar for update display picture.
        showingUpdatingDisplayPictureLoading(false)
    }

    const updatedisplayPictureForCurrentUserPosts = async (username,displayPictureUrl) => {
        db.collection('posts').where("name","==",username).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                doc.ref.update({
                    displayPicture : displayPictureUrl
                })
            })
        })
    }

    const showingUpdatingDisplayPictureLoading = (state) =>{
        if(state){
            document.getElementById("updateDisplayPictureProgressBar").style.display="block"
            document.getElementById("profile-profileIcon").style.filter="blur(5px)";
        }else{
            document.getElementById("updateDisplayPictureProgressBar").style.display="none"
            document.getElementById("profile-profileIcon").style.filter="none";
        }
    }

    const profileIconStyle = {
        width : '200px',
        height : '200px',
        objectFit : 'cover',
        borderRadius: '50%',
        border: 'solid #ffffff',
        borderWidth: '2px'
    }

    const defaultIconStyle = {
        width : '200px',
        height : '200px',
    }

  return (
    <div className='profile container middle'>
        <div className='info'>
            <label for="profileDisplayPicture" className='profileDisplayPicture'>
                <img 
                src={displayPicture == null ? 'https://cdn-icons-png.flaticon.com/512/1051/1051127.png': displayPicture} 
                id='profile-profileIcon' 
                className='profile-profileIcon'
                style={displayPicture!=null ? profileIconStyle: defaultIconStyle}
                />
            </label>
            <input 
            id="profileDisplayPicture" 
            type="file" 
            style={{display : 'none'}} 
            onChange={e => updateDisplayPicture(e)}
            accept="image/png, image/jpeg, image/jpg"/>
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
        <LinearProgress id="updateDisplayPictureProgressBar" className="updateDisplayPictureProgressBar"/>
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