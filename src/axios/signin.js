import axios from 'axios'
export const signin=async(details)=>{
try{
   const {data}=await axios.post(`${process.env.REACT_APP_URL}/signin`,details)
   return data
}
catch(error)
{
    console.log('error in signin.js')
}
}