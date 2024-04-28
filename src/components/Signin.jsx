import React,{useContext, useState} from 'react'
import { Box,styled,Typography,TextField,Button } from '@mui/material'
import {signin} from '../axios/signin'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {appState} from '../contextAPI/Context'

const BOX=styled(Box)`
height:100%;
width:100%;
display:flex;
align-items:center;
flex-direction:column;
gap:10px;

@media (min-width:960px){
    width:50%;
}
`
function Signin(){
  //hooks
  const[details,setDetails]=useState({
    email:'@gmail.com',
    password:''
  })

  const {setLog}=useContext(appState)

  const navigate=useNavigate()

  //functions
  const reset=()=>{
    setDetails({
      email:'@gmail.com',
      password:''
    })
  }

  const handleDetails=(e)=>{
  setDetails({...details,[e.target.name]:e.target.value})
  }

  const sendDetails=async()=>{
    for(let key in details)
    {
        if(details[key].trim().length<1)
        {
            alert('Please fill all details')
            reset()
            return
        }
    }

    const trimE=details.email.trim()
    if(!details.email.includes('@gmail.com') || trimE==='@gmail.com')
    {
        alert('Invalid email address')
        reset()
        return
    }

    const data=await signin(details)
    if(data!=='Wrong password' && data!=='User not found')
    {
      const token=data.token
      const _id=data._id
      Cookies.set('token',token)
      Cookies.set('id',_id)
      setLog(true)
      navigate('/home')
    }
    else
    {
        alert(data)
    }
    reset()
}
  return (
    <>
      <form onSubmit={(e)=>e.preventDefault()}>
      <Box style={{width:'100%',padding:'10px',display:'flex',alignItems:'start',justifyContent:'center',backgroundColor:'white'}}>
      <BOX>
        <Box style={{marginTop:'120px',width:'50%',display:'flex',flexDirection:'column',gap:10}}>
        <Typography style={{textAlign:'center',fontSize:'2rem',color:'grey'}}>Sign In</Typography>
        <TextField label='Email' onChange={handleDetails} value={details.email} name='email'/>
        <TextField label='Password' onChange={handleDetails} value={details.password} type='password' name='password'/>
        </Box>
  
        <Box style={{width:'50%'}}>
        <Button style={{width:'100%'}} onClick={sendDetails}  variant='contained'>Submit</Button>
        </Box>
     </BOX>
    </Box>
    </form>    
    </>

  )
}

export default Signin