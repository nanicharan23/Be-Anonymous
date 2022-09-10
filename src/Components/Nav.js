import React,{useState} from 'react'
import '../CSS/Nav.css'

import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { auth } from '../Firebase/Firebase';

function Nav() {
  const [currentUserEmail, setCurrentUserEmail] = useState(null)
  const [currentUsername, setCurrentUsername] = useState(null)

  // This will trigger when ever user sign in and sign out.
  auth.onAuthStateChanged((user)=>{
    if(user){
      setCurrentUsername(user.displayName)
      setCurrentUserEmail(user.email)
    }
    else{
      setCurrentUserEmail(null)
      setCurrentUsername(null)
    }
  })

  /**
   * This method sign out user 
   * @name signOut
   * @param {*} listOfPosts 
   * @returns none
   */
  const signOut = () => {
    auth.signOut()
  }

  return (
    <div className='sticky-top'>
        <nav className="navbar navbar-expand-lg ">
          <div className="nav-elements container">
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/1051/1051127.png" className='mainLogo'/>
              <div className="navbar-brand">Be Anonymous</div>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <MenuIcon className='hamburger'/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <div className="usernameButton">
                    <AccountCircleIcon/>
                    <div className="usernameText">{currentUsername}</div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="emailButton">
                    <EmailIcon/>
                    <div className="emailText">{currentUserEmail}</div>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="signoutButton" onClick={()=>signOut()}>
                    <ExitToAppIcon/>
                    <div className="signoutText">Sign Out</div>
                  </div> 
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Nav