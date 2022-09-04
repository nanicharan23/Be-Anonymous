import React from 'react'
import '../CSS/Nav.css'

function Nav() {
  return (
    <div className='sticky-top'>
        <nav className="navbar">
            <div className='container'>
                <div className="navbar-brand">Be Anonymous</div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1051/1051127.png" 
                  className='mainLogo'/>
            </div>
        </nav>
    </div>
  )
}

export default Nav