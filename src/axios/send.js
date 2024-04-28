import axios from 'axios'
import Cookies from 'js-cookie'

export const send=async(data)=>{
try{
   const token=Cookies.get('token')
   const id=Cookies.get('id')
   await axios.post(`${process.env.REACT_APP_URL}/send`,data,
   {
    headers:{
        Authorization:`Bearer ${token}`,
        _id:id
    }
   })
}
catch(error)
{
    console.log('error in send.js')
}
}