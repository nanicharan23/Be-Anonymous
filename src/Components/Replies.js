import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import ReplyBox from './ReplyBox';
import '../CSS/Replies.css'

function Replies(props) {
  return (
    <div className='replies'>
        {props.replies && props.replies.slice(0).reverse().map((reply,index)=>
        <div key={uuidv4()+reply.reply}>
            <ReplyBox 
            repliedUsername={reply.repliedUsername}
            displayPicture={reply.displayPicture}
            reply={reply.reply}
            repliedSecond={reply.secondReplied}
            />
        </div> 
        )}
    </div>
  )
}

export default Replies