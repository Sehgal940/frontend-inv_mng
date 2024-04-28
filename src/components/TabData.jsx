import React from 'react'
import {Table,TableContainer,TableCell,TableRow,TableBody,TableHead,Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { deleterec } from '../axios/deleterec';
import { recUp } from '../axios/recUp';
import Cookies from 'js-cookie'

function TabData({open,setOpen,details,loadData,setDataUp}) {
  //functions
  const deleteData=async(value)=>{
    await deleterec(value);
    loadData();
  }

  const update=async(id)=>{
    Cookies.set('recid',id)
    const data=await recUp(id)
    setDataUp(...data)
    setOpen(!open);
  }
  return (
  <>
  <TableContainer  component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{height:'80px'}} key={'table'}>
          <TableCell align="center"><b>Sr no.</b></TableCell>
            <TableCell align="center"><b>Name</b></TableCell>
            <TableCell align="center"><b>Date Received/Items</b></TableCell>
            <TableCell align="center"><b>Date Dispatched/Received</b></TableCell>
            <TableCell align="center"><b>Pending</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
            <TableCell align="center"><b>Qr Code</b></TableCell>
            <TableCell align="center"><b>Admin Panel</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            details!==undefined?
            details.map((value,index)=>
            <TableRow  style={{textTransform:'capitalize'}} key={index}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{value.name}</TableCell>
              <TableCell align="center">{value.date} / {value.quantity}</TableCell>
              <TableCell align="center">{value.dispatch}</TableCell>
              <TableCell align="center">{value.pending}</TableCell>
              <TableCell align="center">{value.status}</TableCell>
              <TableCell  align="center"><a href={value.src} target='_blank'><span style={{cursor:'pointer'}}>{<img height='50px' src={value.src}/>}</span></a></TableCell>
              <TableCell align='center'>
              <span style={{marginLeft:'20px',cursor:'pointer',color:'#D22B2B'}} onClick={()=>{deleteData(value._id)}}><DeleteIcon/></span>
              <span onClick={()=>{update(value._id)}} style={{marginLeft:'15px',cursor:'pointer',color:'#0047AB'}}><EditIcon/></span>
              </TableCell>
            </TableRow>)
            :<></>
          }
        </TableBody>
      </Table>
    </TableContainer>
</>
  )
}

export default TabData