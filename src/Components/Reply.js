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
        if(!validReply(reply)){
            showNotValidReplyAlert()
            return
        }
        
        try{
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
        catch(e){
            console.log(e)
        }
    }

    /**
     * This method is used to validate if reply is valid or not
     * @name validReply
     * @param {string} reply
     * @returns {number} Length of trimmed reply
     */
    const validReply = (reply) => {
       return reply.trim().length > 0
    }

    const showNotValidReplyAlert = () => {
        setReply("")

        document.getElementById('inputReplyBox').placeholder = "Oops! Not Valid Reply.."
        setTimeout(()=>{
            document.getElementById('inputReplyBox').placeholder = 'Reply to Post..'
        },1000)
    }

    return (
        <div className='replyInputBoxOuter'>
            <input 
            id="inputReplyBox"
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