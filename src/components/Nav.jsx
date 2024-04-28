import React,{useContext} from 'react';
import {Box,Button} from '@mui/material'
import {styled} from '@mui/material';
import { useNavigate,Outlet } from 'react-router-dom';
import {appState} from '../contextAPI/Context'
import Cookies from 'js-cookie'

const Comp=styled(Box)`
height:100vh
width:100vw;
`
const Comp1=styled(Box)`
width:100%;
padding:15px;
display:flex;
justify-content:space-between;
align-items:center;
font-size:1.2rem;
color:#0b2cb2;
border-bottom:1px solid #acbcc8;
@media(max-width:680px){
    flex-direction:column;
    gap:10px;
}
`
const Comp2=styled(Box)`
display:flex;
gap:20px;
`

function Nav() {
  //hooks
  const {log,setLog}=useContext(appState) 

  const navigate=useNavigate()

  //functions
  const handleLogout=()=>
  {
    Cookies.remove('token');
    Cookies.remove('id');
    Cookies.remove('recid');

    setLog(false);
    navigate('/signin')
  }
  
  return (
    <Comp>
        <Comp1>
         <Box>Inventory Management System</Box>
         <Comp2>
            {
              log ?
              <Button variant='outlined' onClick={handleLogout} style={{fontSize:'1rem'}}>Log out</Button>
              :
              <>
            <Button variant='outlined' onClick={()=>navigate('signin')} style={{fontSize:'1rem'}}>SignIn</Button>
            <Button variant='contained' onClick={()=>navigate('register')} style={{fontSize:'1rem'}}>Register</Button>
              </> 
            }
         </Comp2>

        </Comp1>

        <Outlet/>
    </Comp>
  )
}

export default Nav