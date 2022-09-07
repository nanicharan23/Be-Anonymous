import React,{useState} from 'react'
import '../CSS/Reply.css'
import SendIcon from '@mui/icons-material/Send';

import db from '../Firebase/Firebase'

function Reply(props) {
    const [reply, setReply] = useState("") // Sets the reply in input box 

    /**
     * This method is used to generate random names
     * @name generateName
     * @param none
     * @returns {string} randomName with length 5.
     */
    const generateName = () => {
        let length = 5
        const characters = 'abcdefghijklmnopqrstuvwxyz'
        let randomName = ' '
        const charactersLength = characters.length

        for(let i = 0; i < length; i++) 
            randomName += characters.charAt(Math.floor(Math.random() * charactersLength))
        
        return randomName
    }

    /**
     * This method is used to add reply to firestore
     * @name generateName
     * @param none
     * @returns {string} randomName with length 5.
     */
    const addReply = async () => {
        if(reply.length == 0)
            return
        
        const docRef = db.collection('posts').doc(props.postId)
        const doc = await docRef.get()
        const replies = doc.data().replies

        const currentSecond = new Date().getTime() / 1000

        replies.push({
            repliedUsername : generateName(), 
            reply : reply,
            secondReplied : currentSecond
        })

        docRef.update({replies : replies})

        setReply("")
    }

    return (
        <div className='replyInputBoxOuter'>
            <input 
            className='replyInputBox' 
            type="text"
            value={reply}
            onChange={(e)=>setReply(e.target.value)}
            placeholder='Reply to Post..'
            />
            {reply.length !=0 && 
            <div onClick={()=>addReply()}>
                <SendIcon className='sendIcon'/>
            </div>
            }
        </div>
    )
}

export default Reply