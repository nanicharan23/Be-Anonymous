import {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom";

import './App.css';
import Nav from './Components/Nav'
import Profile from './Components/Profile';
import { auth } from './Firebase/Firebase'
import Home from './Components/Home';

function App() {
  const [displayLoginPage, setDisplayLoginPage] = useState(false) // Sets whether to display login page or not.

  // This will be triggered when ever use sign in or sign out.
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        setDisplayLoginPage(false)
      }
      else{  
          setDisplayLoginPage(true)
        }
    })
  }, [])

  return (
    <BrowserRouter>
    <div className="App" style={displayLoginPage ? {"backgroundColor":"#212529"}:{"backgroundColor":"#343A40"}}>
      {!displayLoginPage && <Nav/>}
          <Switch>
            <Route exact path="/">
              <Home displayLoginPage = {displayLoginPage} setDisplayLoginPage/>
            </Route>
            <Route path="/profile">
              {!displayLoginPage && <Profile/>}
            </Route>
          </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
