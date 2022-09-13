import React,{useState, useEffect} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import Collapse from '@mui/material/Collapse';

import '../CSS/Post.css'
import Linkify from 'react-linkify';
import Reply from './Reply';
import Replies from './Replies';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import db, { auth } from '../Firebase/Firebase';

import VerifiedIconLogo from '../Images/VerifiedIcon.png'

function Post(props) {

  const [filled, setFilled] = useState(false) // Sets whether like icon should be filled or bordered.

  const [expanded, setExpanded] = useState(false)
  /**
   * @name getTimeAgo
   * @param {*} secondPosted 
   * @returns {string} Formated Time Ago time
   */
  const getTimeAgo = (secondPosted) => {
      TimeAgo.addLocale(en)
      const timeAgo = new TimeAgo('en-US')

      const currentSecond = new Date().getTime() / 1000
      const diff = currentSecond - secondPosted

      return timeAgo.format(Date.now() - diff*1000)
  }

  /**
   * This method is triggered when like button is clicked and makes necessary changes to firestore.
   * @name clickedLike
   * @param {} none
   */
  const clickedLike = async () => {
      const currentUserId = auth.currentUser.uid
      const currentPostId = props.postId

      const docId = currentUserId+"=>"+currentPostId
  
      const docRef = db.collection('likes').doc(docId)
      
      const doc = await docRef.get()

      const postDocRef = db.collection('posts').doc(props.postId)
      const postDoc = await postDocRef.get()

      const currentLikes = postDoc.data().postLikes

      if(doc.data() == undefined){
        setFilled(true)
        db.collection('likes').doc(docId).set({
            liked : true
        })
        postDocRef.update({
          postLikes : currentLikes + 1
        })
      }
      else{
        if(doc.data().liked){
          setFilled(false)
          postDocRef.update({
            postLikes : currentLikes - 1
          })

          docRef.update({
            liked : false
          })
        }
        else{
          setFilled(true)
          postDocRef.update({
            postLikes : currentLikes + 1
          })
          docRef.update({
            liked : true
          })
        }
      }
  }

  useEffect(() => {
    const currentUserId = auth.currentUser.uid
    const currentPostId = props.postId

    const docId = currentUserId+"=>"+currentPostId

    const docRef = db.collection('likes').doc(docId)
    
    docRef.get().then((doc)=>{
      if(doc.data() == undefined)
        setFilled(false)
      else{
        if(doc.data().liked)
          setFilled(true)
          else
            setFilled(false)
      }
    })
  }, [])
  
  return (
    <div className='post'>
        <div className='postLeft'>
            <img src='https://cdn-icons-png.flaticon.com/512/3393/3393852.png' 
            className='profileIcon'/>
        </div>

        <div className='postRight'>
            <div className='postRight_1'>
              <div className='userNameAndIcon'>
                <div className='username'>{props.name}</div>
                <img className="verifiedIcon" src={VerifiedIconLogo}/>
              </div>
              <div className='timestamp'>{getTimeAgo(props.secondPosted)}</div>
            </div>
            <Linkify>
              <div>{props.content}</div>
            </Linkify>
            {props.fileUrl!=null && <img className="postImage" src={props.fileUrl}></img>}

            <div className='postFooter'>
              <div className='likeButton' onClick={()=>clickedLike()}>
                {filled? <FavoriteIcon  id="filledLikeIcon" className='filledLikeIcon'/>:<FavoriteBorderIcon  id="borderedLikeIcon" className='borderLikeIcon'/>}
                <div className='likeText'>{props.likes}</div>
              </div>
              <div className='replyButton' onClick={() => setExpanded(!expanded)}>
                    <ForumIcon className='replyIcon'/>
                    {props.replies && <div className='repliesCount'>{props.replies.length}</div>}
              </div>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div id="replySection">
                <Reply postId={props.postId}/>
                <Replies postId={props.postId} replies={props.replies}/>
              </div>
            </Collapse>
        </div>
    </div>
  )
}

export default Post