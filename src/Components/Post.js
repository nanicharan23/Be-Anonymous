import React,{useState} from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import ReplyIcon from '@mui/icons-material/Reply';
import '../CSS/Post.css'
import Linkify from 'react-linkify';
import Reply from './Reply';
import Replies from './Replies';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

function Post(props) {
  const [replyDisplay, setReplyDisplay] = useState("none") // Sets display of reply section

  const getTimeAgo = (secondPosted) => {
      TimeAgo.addLocale(en)
      const timeAgo = new TimeAgo('en-US')

      const currentSecond = new Date().getTime() / 1000
      const diff = currentSecond - secondPosted

      return timeAgo.format(Date.now() - diff*1000)
  }

  return (
    <div className='post'>
        <div className='postLeft'>
            <img src='https://cdn-icons-png.flaticon.com/512/3393/3393852.png' 
            className='profileIcon'/>
        </div>

        <div className='postRight'>
            <div className='postRight_1'>
                <div className='username'>{props.name}</div>
                <VerifiedIcon></VerifiedIcon>
            </div>
            <Linkify>
              <div>{props.content}</div>
            </Linkify>
            {props.fileUrl!=null && <img className="postImage" src={props.fileUrl}></img>}

            <div className='postFooter'>
              <div className='replyButton' onClick={() => replyDisplay=="none" ? setReplyDisplay("block") : setReplyDisplay("none")}>
                    <div className='repliesCount'>{props.replies.length}</div>
                    <div className='replyText'>Reply</div>
                    <ReplyIcon className='replyIcon'/>
              </div>
              <div className='timestamp'>{getTimeAgo(props.secondPosted)}</div>
            </div>

            <div id="replySection" style={{"display":replyDisplay}}>
              <Reply postId={props.postId}/>
              <Replies postId={props.postId} replies={props.replies}/>
            </div>
        </div>
    </div>
  )
}

export default Post