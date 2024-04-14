import React,{useState} from 'react'
import '../CSS/Reply.css'
import SendIcon from '@mui/icons-material/Send';

import db, { auth } from '../Firebase/Firebase'
import { v4 as uuidv4 } from 'uuid';

function Reply(props) {
    // This is used to filter the bad words in reply.
    var Filter = require('bad-words');
    var filter = new Filter();

    const [reply, setReply] = useState("") // Sets the reply in input box 

    /**
     * This method is used to verify is input has all emojies or not
     * @name allEmojies
     * @param {string} Input
     * @returns {} none
     */
         const allEmojies = (input) => {
            for(var i=0;i<input.length;i++){
                var char = input.charAt(i)
    
                if(isLetter(char))
                    return false
            }
            return true
        }
    
    /**
     * This method is used to verify if given character is Letter or not
     * @name isLetter
     * @param {CharacterData} char
     * @returns {} none
     */
     const isLetter = (char) => {
        if (typeof char !== 'string') 
            return false

        return char.toLowerCase() !== char.toUpperCase()
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
                replyId : uuidv4(),
                repliedUsername : auth.currentUser.displayName, 
                displayPicture : auth.currentUser.photoURL,
                reply : allEmojies(reply) ? reply : filter.clean(reply),
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