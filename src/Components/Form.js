import React, { useState } from 'react'
import $ from 'jquery' 
import '../CSS/Form.css'

import {v4} from 'uuid'

import imageCompression from 'browser-image-compression'

import {firebaseApp} from '../Firebase/Firebase'   
import db from '../Firebase/Firebase'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

import TagIcon from '@mui/icons-material/Tag';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import LinearProgress from '@mui/material/LinearProgress';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

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
    const [imageUrl, setImageUrl] = useState(null) // Sets the file url when file is uploaded

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

        if(!validInput(input) && imageUrl == null ){
            showInvalidInputAlert()
            return
        }

        e.preventDefault()

        try{
            db.collection('posts').add({
                secondPosted : currentSecond,
                name : generateName(),
                content: input.length == 0 ? "" : filter.clean(input),
                timestamp : formatedDate,
                fileUrl : imageUrl
            })

            resetThingsAfterPosting()
        }
        catch(e){
            showInvalidInputAlert()
        }
    }

    /**
     * This method is used to display alert when input is not entered or invalid.
     * @name showInvalidInputAlert
     * @param {} none
     * @returns {} none
     */
    const showInvalidInputAlert = () => {
        document.getElementById("inputBox").style.border = "1px solid #ADB5BD"
        document.getElementById("inputBox").style.borderRadius  = "20px"
        document.getElementById("invalidInput").style.display="flex"
        document.getElementById("inputBox").placeholder = "Oops, Not Valid!!"

        setTimeout(()=>{
            document.getElementById("inputBox").style.border = "none"
            document.getElementById("inputBox").style.borderRadius  = "none"
            document.getElementById("inputBox").placeholder = "What's going on..."
            document.getElementById("invalidInput").style.display="none"
        },3000)
    }

    /**
     * This method is used to reset things after posting a post.
     * @name resetThingsAfterPosting
     * @param {} none
     * @returns {} none 
     */
    const resetThingsAfterPosting = () => {
        setInput("")
        setImageUrl(null)
        changeUploadedDotState("none")
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

    /**
     * This method is invoked when an image is uploaded.
     * @name onFileChange
     * @param {string} Event Listener
     * @returns {} none
     */
    const onFileChange = async (e) => {
        const image = e.target.files[0]
        
        if(image==null) return

        changePostButtonState(true, 0.5)
        changeImageUploadProgressBarState("block")

        const compressionOptions = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }

        const compressedImage = await imageCompression(image, compressionOptions);
        const compressedImageName = compressedImage.name + v4()

        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child(`postImages/${compressedImageName}`)
        await fileRef.put(compressedImage)
        
        setImageUrl(await fileRef.getDownloadURL())

        changePostButtonState(false, 1)
        changeImageUploadProgressBarState("none")
        changeUploadedDotState("block")
    }

    /**
     * This method is used to disable or enable the post button
     * @name changePostButtonState
     * @param {string} disabled
     * @param {string} opacity
     * @returns {} none
     */
    const changePostButtonState = (disabled,opacity) => {
        document.getElementById("buttonPost").setAttribute("disabled",disabled)
        document.getElementById("buttonPost").style.opacity = opacity;
    }

    /**
     * This method is used to disable or enable the image uploading progress bar.
     * @name changeImageUploadProgressBarState
     * @param {string} state
     * @returns {} none
     */
    const changeImageUploadProgressBarState = (state) => {
        document.getElementById("imageUploadProgressBar").style.display=state
    }
    
    /**
     * This method is used to disable or enable uploaded tick when image is uploaded
     * @name changeUploadedDotState
     * @param {string} state
     * @returns {} none
     */
    const changeUploadedDotState = (state) => {
        document.getElementById("uploadedDot").style.display = state
    }

    /**
     * This method appends '#' symbol at the end of input when hashtag buttong is clicked
     * @name clickedHashtag
     * @param {} none
     * @returns {} none
     */
    const clickedHashtag = () => {
        setInput(input+"#")
        $(".inputBox").focus()
    }


    return (
        <div>
            <div className='form'>
                <div className='formLeft'>
                    <img src='https://cdn-icons-png.flaticon.com/512/3393/3393852.png' 
                    className='profileIcon'/>
                </div>
                <div className='formRight'>
                    <input 
                    id="inputBox"
                    type="text" 
                    className="inputBox"
                    placeholder="What's going on..."
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    ></input>

                    <div id="invalidInput" className='invalidInputAlert'>
                        <div>Drop Valid Msg or Upload a Pic..</div>
                        <WarningRoundedIcon className="warningIcon"/>
                    </div>

                    <input 
                    id="inputImage"
                    className='imageInput'
                    type="file"
                    onChange={e => onFileChange(e)}
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    ></input>

                    <div className="post-add-ons">
                        <div className="upload">
                            <label htmlFor="inputImage" id="uploadLabel" className="uploadLabel">
                                <div id="uploadedDot" className='uploadedDot'>✓</div>
                                <InsertPhotoIcon className='uploadImageIcon'/>
                            </label>
                        </div>
                        <div className="hastag">
                            <label className="hastagLabel" onClick={clickedHashtag}>
                                <TagIcon className='hashtagIcon'/>
                            </label>
                        </div>
                    </div>

                    <button id="buttonPost" className='postButton' type="submit" onClick={sendPost}>
                        <div className='postText'>Post </div>
                        <img className='rocket' 
                        src="https://cdn-icons-png.flaticon.com/512/3471/3471653.png"/>
                    </button>
                </div>
            </div>

            <LinearProgress id="imageUploadProgressBar" className="imageUploadProgressBar"/>
        </div>
    )
}

export default Form
