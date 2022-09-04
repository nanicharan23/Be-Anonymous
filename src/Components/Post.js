import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import '../CSS/Post.css'

function Post(props) {

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
            <div>{props.content}</div>
            {props.fileUrl!=null && <img className="postImage" src={props.fileUrl}></img>}
            <div className='timestamp'>{props.timestamp}</div>
        </div>
    </div>
  )
}

export default Post