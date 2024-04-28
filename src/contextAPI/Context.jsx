import React,{createContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
const appState=createContext(null)


function Context({children}) {
  const token=Cookies.get('token')
  const [log,setLog]=useState(false)

  useEffect(()=>{
    {token!==undefined?setLog(true):setLog(false)}
  },[log])
  
  return (
    <>
    <appState.Provider value={{log,setLog}}>
    {children} 
    </appState.Provider>   
    </>
  )
}

export {Context,appState}