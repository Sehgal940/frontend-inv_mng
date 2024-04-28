import React,{useState,useContext, useEffect,useRef} from 'react'
import {Card,CardContent,TextField,Button, Container,styled,Select,MenuItem,Box} from '@mui/material'
import TabData from './TabData'
import { appState } from '../contextAPI/Context'
import { useNavigate } from 'react-router-dom'
import { send } from '../axios/send'
import { records } from '../axios/records'
import {sendUp} from '../axios/sendUp'
import {compare} from '../axios/compare'


const CARD=styled(Card)`
min-height:100px;
display:flex;
justify-content:start
;
`

const CARDCONTENT = styled(CardContent)`
  width: 100%;
  @media (max-width: 960px) {
    width:60%;
  }
`

function Home() {
  //hooks
  const navigate=useNavigate() 

  const[open,setOpen]=useState(true)

  const {log}=useContext(appState)

  const [data,setData]=useState({
    name:'',
    quantity:'',
    date:''
  })

  const [dataUp,setDataUp]=useState({
    name:'',
    quantity:'',
    date:''
  })

  const [details,setDetails]=useState([])
  const [load,setLoad]=useState(false)
  //functions
  const loadData=async()=>{
   setDetails(await records())
  }

  useEffect(()=>{
    loadData()
   },[data,dataUp,load])

  const reset=()=>{
    setData({
      name:'',
      quantity:'',
      date:''
    })
  }

  const resetUp=()=>{
    setDataUp({
      name:'',
      quantity:'',
      date:''
    })
  }

  const handleData=(e)=>{
   setData({...data,[e.target.name]:e.target.value})
  }

  const handleDataUp=(e)=>{
    setDataUp({...dataUp,[e.target.name]:e.target.value})
   }

  const sendData=async()=>{
    for(let key in data)
    {
        if(data[key].trim().length<1)
        {
            alert('Please fill all details')
            reset()
            return
        }
    }

    const selectedDate = new Date(data.date);
    if (selectedDate.getTime() < Date.now()) {
      alert('Please select a date in the future');
      reset()
      return
    }

    if(parseInt(data.quantity)<=0)
    {
      alert('Please enter valid quantity');
      reset()
      return
    }
    await send(data)
    reset()
  }

  const sendDataUp=async()=>{
    for(let key in dataUp)
    {
        if(dataUp[key].length<1)
        {
            alert('Please fill all details')
            resetUp()
            return
        }
    }

    const selectedDate = new Date(dataUp.date);
    if (selectedDate.getTime() < Date.now()) {
      alert('Please select a date in the future');
      resetUp()
      return
    }

    if(parseInt(dataUp.quantity)<=0)
    {
      alert('Please enter valid quantity');
      resetUp()
      return
    }
    await sendUp(dataUp)
    setOpen(!open)
    resetUp()
  }
  


  const input=useRef()

  //functions

  const handleClick=()=>{
    input.current.click()
  }

  const handleFile=async(e)=>{
    const file = e.target.files[0];
    const fd=new FormData()
    fd.append('file',file)
    const data=await compare(fd)
    if(data==='done')setLoad(!load)
  }

return (
<>
{
  log ?
<>
<br/>

<Container>
<form onSubmit={(e)=>(e.preventDefault())}>
<CARD>
<CARDCONTENT>
{
 open
 ?
  <>
  <Box style={{display:'flex',gap:'20px',alignItems:'center'}}>
  <span style={{color:'#0b2cb2',fontSize:'1.2rem',display:'block'}}>Generate Qr Code</span>
  <Button variant='contained' onClick={handleClick}>Scan Qr Code</Button>
  <input ref={input} style={{visibility:'hidden'}} onChange={handleFile} type='file'/>
  </Box>
  <br/>
  <Select label="Name" onChange={handleData} value={data.name} name='name'>
    <MenuItem value={'c1'}>C1</MenuItem>
    <MenuItem value={'c2'}>C2</MenuItem>
    <MenuItem value={'c3'}>C3</MenuItem>
    <MenuItem value={'c4'}>C4</MenuItem>
    <MenuItem value={'c5'}>C5</MenuItem>
    </Select>
  <TextField label='Quantity' name='quantity' type='number' value={data.quantity}  onChange={handleData}  style={{marginLeft:'30px',marginTop:'5px'}}/>
  <input type='date' name='date' onChange={handleData} value={data.date}  style={{textTransform:'uppercase',height:'53px',minWidth:'15%',cursor:'text',
  textAlign:'center',color:'grey',borderRadius:'4px',outline:'none',border:'1px solid lightgrey',marginLeft:'30px',marginTop:'5px'}}/>
  <Button size='large' variant='contained' onClick={sendData} style={{marginLeft:'30px',marginTop:'5px'}}>Add</Button>
  </>
  :
  <>
  <span style={{color:'#0b2cb2',fontSize:'1.2rem',display:'block'}}>Update</span>

  <br/>

  <Select label="Name" onChange={handleDataUp} value={dataUp.name} name='name'>
    <MenuItem value={'c1'}>C1</MenuItem>
    <MenuItem value={'c2'}>C2</MenuItem>
    <MenuItem value={'c3'}>C3</MenuItem>
    <MenuItem value={'c4'}>C4</MenuItem>
    <MenuItem value={'c5'}>C5</MenuItem>
    </Select>
  <TextField label='Quantity' name='quantity' type='number' value={dataUp.quantity}  onChange={handleDataUp}  style={{marginLeft:'30px',marginTop:'5px'}}/>
  <input type='date' name='date' onChange={handleDataUp} value={dataUp.date}  style={{textTransform:'uppercase',height:'53px',minWidth:'15%',cursor:'text',
  textAlign:'center',color:'grey',borderRadius:'4px',outline:'none',border:'1px solid lightgrey',marginLeft:'30px',marginTop:'5px'}}/>
  <Button size='large' variant='contained' onClick={sendDataUp} style={{marginLeft:'30px',marginTop:'5px'}}>update</Button>
  </>
}
</CARDCONTENT>
</CARD>
</form>

<br/>

<TabData  open={open} setOpen={setOpen} details={details} loadData={loadData} setDataUp={setDataUp}  />
</Container>
</>
:
navigate('/signin')
}
</>)}

export default Home