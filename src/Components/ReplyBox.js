import React from 'react'

import VerifiedIcon from '@mui/icons-material/Verified';
import Linkify from 'react-linkify';

import '../CSS/ReplyBox.css'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

function ReplyBox(props) {

    const getTimeAgo = (secondPosted) => {
        TimeAgo.addLocale(en)
        const timeAgo = new TimeAgo('en-US')
  
        const currentSecond = new Date().getTime() / 1000
        const diff = currentSecond - secondPosted
  
        return timeAgo.format(Date.now() - diff*1000)
    }

    return (
        <div className='replyBox'>
            <div className='replyBoxLeft'>
                <img 
                src={props.displayPicture == null ?'https://cdn-icons-png.flaticon.com/512/3393/3393852.png' : props.displayPicture}
                className='profileIcon-replyBox'/>
            </div>
            <div className='replyBoxRight'>
                <div className='replyBoxRight_1'>
                    <div className='repliedUsername'>{props.repliedUsername}</div>
                    <VerifiedIcon className='verifiedIcon'></VerifiedIcon>
                </div>
                <Linkify>
                <div>{props.reply}</div>
                </Linkify>
                <div className='timeAgo'>{getTimeAgo(props.repliedSecond)}</div>
            </div>
        </div>
  )
}

export default ReplyBox