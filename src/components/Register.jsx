import { Box,TextField,Button, Typography,styled } from '@mui/material'
import React,{useState} from 'react'
import {register} from '../axios/register'
import { useNavigate } from 'react-router-dom'

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

function Register() {
    //hooks
    const[details,setDetails]=useState({
        firstname:'',
        lastname:'',
        email:'@gmail.com',
        password:''
    })

    const navigate=useNavigate()

    //functions
    const handleDetails=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
    }

    const reset=()=>{
        setDetails({
            firstname:'',
            lastname:'',
            email:'@gmail.com',
            password:''
        })
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
        const data=await register(details)
        if(data==='User created')
        {
            navigate('/signin')
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
      <Box style={{padding:'10px',width:'100vw',display:'flex',alignItems:'start',justifyContent:'center',backgroundColor:'white'}}>
        <BOX>
          <Box style={{marginTop:'120px',width:'50%',display:'flex',flexDirection:'column',gap:10}}>
          <Typography style={{textAlign:'center',fontSize:'2rem',color:'grey'}}>Register</Typography>
  
          <Box style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
          <TextField style={{width:'48%'}} onChange={handleDetails} value={details.firstname} label='First Name'  name='firstname'/>
          <TextField style={{width:'48%'}} onChange={handleDetails} value={details.lastname}  label='Last Name'  name='lastname'/>
          </Box>
          <TextField label='Email' onChange={handleDetails} value={details.email}  name='email'/>
          <TextField label='Password' onChange={handleDetails} value={details.password} name='password'/>
          </Box>
  
          <Box style={{width:'50%'}}>
          <Button style={{width:'100%'}} onClick={sendDetails} variant='contained'>Submit</Button>
          </Box>
          </BOX>
      </Box>
      </form>
    </>
  )
}

export default Register