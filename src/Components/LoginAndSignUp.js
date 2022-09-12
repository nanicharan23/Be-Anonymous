import React,{useState} from 'react'
import '../CSS/LoginAndSignUp.css'

import {auth} from '../Firebase/Firebase'

import $ from 'jquery'

function LoginAndSignUp(props) {
    const [email, setEmail] = useState("") // Sets email when entered in input box
    const [password, setPassword] = useState("") // Sets password when entered in input box

    const [warning, setWarning] = useState("")

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
     * This method is used to sign up new users.
     * @name signUp
     * @returns {} none
     */
    const signUp = () => {

        auth.createUserWithEmailAndPassword(email, password).then(async (credentials)=>{
            credentials.user.updateProfile({
                displayName : generateName()
            }).then(()=>{
                window.location.reload()
                props.setDisplayLoginPage(false)
                $(window).scrollTop(0)
            })
        }).catch((error)=>{
            if(error.code === "auth/invalid-email")
                displayWeakPassWordAlert("Invalid Email...")
            else if(error.code === "auth/email-already-in-use")
                displayWeakPassWordAlert("Email already exists...")
            else if(error.code === "auth/weak-password")
                displayWeakPassWordAlert("Password should be atleast 6 characters..")
            else if(error.code === "auth/missing-email")
                displayWeakPassWordAlert("Please Enter Email...")
            else if(error.code === "auth/internal-error")
                displayWeakPassWordAlert("Something went wrong, try properly...")
            else
                displayWeakPassWordAlert("Sorry, there something wrong from our side..")
        })
    }

    /**
     * This method is used to sign in a user.
     * @name signIn
     * @returns {}
     */
    const signIn = () => {
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value
        
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            props.setDisplayLoginPage(false)
            $(window).scrollTop(0)
        }).catch((error)=>{
            console.log(error)
            if(error.code === "auth/invalid-email")
                displayWeakPassWordAlert("Invalid Email...")
            else if(error.code === "auth/weak-password")
                displayWeakPassWordAlert("Password should be atleast 6 characters..")
            else if(error.code === "auth/missing-email")
                displayWeakPassWordAlert("Please Enter Email...")
            else if(error.code === "auth/internal-error")
                displayWeakPassWordAlert("Something went wrong, try properly...")
            else if (error.code === "auth/user-not-found")
                displayWeakPassWordAlert("User not found, Please Sign Up...")
            else if (error.code === "auth/wrong-password")
                displayWeakPassWordAlert("Wrong Password...")
            else
                displayWeakPassWordAlert("Sorry, something went wrong...")
        })
    }

    /**
     * This method is used to display warning when password is not atleast 6 characters.
     * @name generateName
     * @param none
     * @returns {string} randomName with length 5.
     */
    const displayWeakPassWordAlert = (warningText) => {
        document.getElementById('weakPasswordAlert').style.display='block'
        setWarning(warningText)

        setTimeout(()=>{
            document.getElementById('weakPasswordAlert').style.display='none'            
            setWarning("")
        },3000)
    }

    return (
        <div className='loginPage'>
            <div className='productName'>Be Anonymous</div>
            <img src="https://cdn-icons-png.flaticon.com/512/1051/1051127.png" className='loginLogo'/>
            <div className='welcomeMessage'>Couldn't share anything to anyone?? Then try this..</div>
            <div className='loginForm'>
                <div className='loginInputs'>
                    <input id="emailInput" type="text" className='emailInput' placeholder='Enter Email...' autoComplete="off" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
                    <input id="passwordInput" type="password" className='passwordInput' placeholder='Enter Password...' autoComplete="off" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <div id="weakPasswordAlert" className='weakPasswordAlert'>{warning}</div>
                </div>
                <div className='loginButtons'>
                    <button type='submit' className='loginButton' onClick={()=>signIn()}>Sign In</button>
                    <button type='submit' className='signUpButton' onClick={()=>signUp()}>Sign Up</button>
                </div>
            </div>
            <div className='depressedLogos'>
                <img src="https://cdn-icons-png.flaticon.com/512/843/843331.png" 
                        className='hackerLogo'/>
            </div>
            <div className='note'>Confess anything..Rant anyone..<br/>You're always Anonymous.</div>
        </div>
    )
}

export default LoginAndSignUp