import axios from 'axios'
import Cookies from 'js-cookie'

export const deleterec=async(value)=>{
try{
   const token=Cookies.get('token')
   await axios.post(`${process.env.REACT_APP_URL}/deleterec`,value,
   {
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
}
catch(error)
{
    console.log('error in deleterec.js')
}
}