import {useState} from 'react'

import './App.css';
import Nav from './Components/Nav'
import Feed from './Components/Feed'
import Form from './Components/Form';
import Footer from './Components/Footer';
import { auth } from './Firebase/Firebase'
import LoginAndSignUp from './Components/LoginAndSignUp';

function App() {
  
  const [displayLoginPage, setDisplayLoginPage] = useState(false) // Sets whether to display login page or not.

  // This will be triggered when ever use sign in or sign out.
  auth.onAuthStateChanged((user)=>{
    if(user){
      setDisplayLoginPage(false)
    }
    else{  
        setDisplayLoginPage(true)
      }
  })

  return (
    <div className="App" style={displayLoginPage ? {"backgroundColor":"#212529"}:{"backgroundColor":"#343A40"}}>
      {!displayLoginPage && <Nav/>}
      <div className='container middle'>
        { displayLoginPage && <LoginAndSignUp setDisplayLoginPage={setDisplayLoginPage}/>}
        { !displayLoginPage && 
        <div>
          <Form/>
          <Feed/>
        </div>}
      </div>
      {!displayLoginPage && <Footer/>}
    </div>
  );
}

export default App;
