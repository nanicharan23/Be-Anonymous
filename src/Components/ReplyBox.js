import React from 'react'

import VerifiedIcon from '@mui/icons-material/Verified';
import Linkify from 'react-linkify';

import '../CSS/ReplyBox.css'

function ReplyBox(props) {
  return (
    <div className='replyBox'>
        <div className='replyBoxLeft'>
            <img 
            src='https://cdn-icons-png.flaticon.com/512/3393/3393852.png' 
            className='profileIcon'/>
        </div>
        <div className='replyBoxRight'>
            <div className='replyBoxRight_1'>
                <div className='repliedUsername'>{props.repliedUsername}</div>
                <VerifiedIcon className='verifiedIcon'></VerifiedIcon>
            </div>
            <Linkify>
              <div>{props.reply}</div>
            </Linkify>
        </div>
    </div>
  )
}

export default ReplyBox