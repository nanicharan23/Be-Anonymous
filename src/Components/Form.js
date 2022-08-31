import React, { useState } from 'react'
import '../CSS/Form.css'
import db from '../Firebase/Firebase'

function Form() {
    // This is used to filter the bad words in content.
    var Filter = require('bad-words');
    var filter = new Filter();

    // This is used to get the current timestamp.
    const moment = require('moment');
    var formatedDate = moment().format("MMM Do YYYY • ddd • h:mm a");

    // This is used to get the current second
    var currentSecond = new Date().getTime() / 1000;

    const [input, setInput] = useState("") // Sets the input when ever input field is changed.
    
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
     * This method is used to add new post to database(Cloud Firestore).
     * @name sendPost
     * @param {EventListener} Event when clicked post.
     * @returns {void} none
     */
    const sendPost = e => {
        if(!validInput(input))
            return

        e.preventDefault()

        db.collection('posts').add({
            secondPosted : currentSecond,
            name : generateName(),
            content: filter.clean(input),
            timestamp : formatedDate
        })

        setInput("")
    }

    /**
     * This method is used to validate if the input is valid or not.
     * @name validInput
     * @param {string} input
     * @returns {boolean} true if valid else false
     */
    const validInput = (input) => {
        return input.trim().length != 0
    }

  return (
    <div className='form'>
        <div className='formLeft'>
            <img src='https://cdn-icons-png.flaticon.com/512/3393/3393852.png' 
            className='profileIcon'/>
        </div>
        <div className='formRight'>
            <input 
            type="text" 
            className="inputBox"
            placeholder="What's going on..."
            value={input}
            onChange={e=>setInput(e.target.value)}
            ></input>

            <button className='postButton' type="submit" onClick={sendPost}>
                <div className='postText'>Post </div>
                <img className='rocket' 
                src="https://cdn-icons-png.flaticon.com/512/3471/3471653.png"/>
            </button>
        </div>
    </div>
  )
}

export default Form
