import axios from 'axios'
import Cookies from 'js-cookie'

export const recUp=async(id)=>{
try{
   const token=Cookies.get('token')
   const {data}=await axios.get(`${process.env.REACT_APP_URL}/recUp`, {
    headers:{
        Authorization:`Bearer ${token}`,
        _id:id
    }
   })
   return data
}
catch(error)
{
    console.log('error in recUp.js')
}
}