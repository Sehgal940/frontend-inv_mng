import axios from 'axios'
import Cookies from 'js-cookie'

export const compare=async(fd)=>{
try{
   const token=Cookies.get('token')
   const {data}=await axios.post(`${process.env.REACT_APP_URL}/compare`,fd,
   {
    headers:{
        Authorization:`Bearer ${token}`,
        'Content-type':'multipart/form-data'
    }
   })
   return data
}
catch(error)
{
    console.log('error in compare.js')
}
}