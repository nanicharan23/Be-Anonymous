import {React} from 'react'

import Feed from './Feed'
import Form from './Form';
import LoginAndSignUp from './LoginAndSignUp';

function Home({displayLoginPage, setDisplayLoginPage}) {
  return (
    <div>
      <div className='container middle'>
        { displayLoginPage && <LoginAndSignUp setDisplayLoginPage={setDisplayLoginPage}/>}
        { !displayLoginPage && 
        <div>
          <Form/>
          <Feed/>
        </div>}
      </div>
    </div>
  )
}

export default Home