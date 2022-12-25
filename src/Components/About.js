import React from 'react'
import '../CSS/About.css';
import DeveloperImage from '../Images/Developer.JPG'

function About() {
  return (
    <div className='about container middle'>
        <div className='about-inner'>
            <img src='https://cdn-icons-png.flaticon.com/512/1051/1051127.png' className='profile-profileIcon'/>
            <div className='description'>
                <b>Be Anonymous</b> is a place where you doesn't need to hesitate to tell something. If you have something to express or confess anonymously, Be Anonymous is the right place to express.
            </div>
            <div className='developer'>
                <div>
                    <div className='description font-weight-bold'>Developed By:</div>
                    <img src={DeveloperImage} className='img-fluid developer-image shadow-lg'/>
                    <div className='about-developer'>
                        <div className='developer-name'>Sri Charan</div>
                        <div className='developer-subtitle'><b>Founder</b>, <b>CEO</b> & <b>CTO</b> of Be Anonymous</div>
                    </div>
                    <div className='description'>Sri Charan is a Software Engineer who is always passionate about programming and always hunger to learn new things. He is having 1+ years of work experience. He is an Ex-Amazonian where he worked as SDE-1.  He is currently working at Goldman Sachs as Software Engineer and CEO of Be Anonymous.</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About