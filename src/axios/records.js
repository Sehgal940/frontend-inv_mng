import axios from 'axios'
import Cookies from 'js-cookie'

export const records=async()=>{
try{
   const token=Cookies.get('token')
   const id=Cookies.get('id')
   const {data}=await axios.get(`${process.env.REACT_APP_URL}/records`, {
    headers:{
        Authorization:`Bearer ${token}`,
        _id:id
    }
   })
   return data
}
catch(error)
{
    console.log('error in records.js')
}
}