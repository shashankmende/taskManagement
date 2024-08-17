
import './index.css'

import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const DashBoardNav = () => {
    const {logout} = useAuth0()
    const [firstName,setFirstName]=useState('')

    useEffect(()=>{
        const name = JSON.parse(localStorage.getItem("firstName"))
        setFirstName(name)
    })

  return (
    <div className='dashboard_wrapper'>
        <div className='nav_content'>
            <h1 className='nav_heading'>welcome, {firstName}</h1>
            {/* <h1 className='nav_heading'>welcome, <span style={{color:"blue"}}>{firstName}</span></h1> */}
            <button onClick={()=>
                logout({
                    logoutParams:{returnTo:window.location.origin}
                })
            } className='btn btn-primary'>Logout</button>
        </div>
    </div>
  )
}

export default DashBoardNav