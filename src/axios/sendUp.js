import axios from 'axios'
import Cookies from 'js-cookie'

export const sendUp=async(dataUp)=>{
try{
   const token=Cookies.get('token')
   const id=Cookies.get('recid')
   await axios.post(`${process.env.REACT_APP_URL}/sendup`,dataUp,
   {
    headers:{
        Authorization:`Bearer ${token}`,
        _id:id
    }
   })
}
catch(error)
{
    console.log('error in sendUp.js')
}
}