import axios from 'axios'
export const register=async(details)=>{
try{
   const {data}=await axios.post(`${process.env.REACT_APP_URL}/register`,details)
   return data
}
catch(error)
{
    console.log('error in register.js')
}
}