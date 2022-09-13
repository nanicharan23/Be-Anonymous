import React from 'react'
import '../CSS/Footer.css'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

function Footer() {
  // This method is triggered when home or post button is clicked and scrolls to page top.
  const goPageTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <div className='container position-sticky fixed-bottom'>
      <div className='footer row'>
          <div className='col-6 text-center homeIcon' onClick={goPageTop}>
            <HomeRoundedIcon className='footerIcons'/>
          </div>
          <div className='col-6 text-center postIcon' onClick={goPageTop}>
            <DriveFileRenameOutlineRoundedIcon className='footerIcons'/>
          </div>
      </div>
    </div>
  )
}

export default Footer