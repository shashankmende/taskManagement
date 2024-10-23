
import React from 'react'

const PasswordStrength = ({password}) => {

    const calculateStrength = (password)=>{
        if (password.length===0){
            return ""
        }
        else if(password.length>=8 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)){
            return "strong"
        }
        else if(password.length>=6 && /[A-Z]/.test(password) && /\d/.test(password)){
            return "medium"
        }
        else if(password.length>=6){
            return "medium"
        }
        
        else if(password.length<6){
            return "weak"
        }
    
        
        

    }

    const strength = calculateStrength(password)
   const styleObj = {
        weak:"red",
        medium:'orange',
        strong:"green"
    }

  return (
     <p style={{color:`${styleObj[strength]}`}}>{strength}</p>
  )
}

export default PasswordStrength