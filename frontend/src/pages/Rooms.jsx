import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../App.module.css'
import { io } from 'socket.io-client'



function Rooms() {


  let [message,setMessage]= useState("")
  let [messages,setMessages]=useState([]);

  let [rooms,setRooms] = useState([])



  useEffect(()=>{
    const socket = io("http://localhost:8080")
   

    socket.on("loadRooms", (data)=>{
      console.log(data)
      setRooms(data)
    },[])

    socket.on("toclient",(data)=>{

      setMessages((prevValue)=>{
        return [...prevValue,data]
      })

    })

  },[])
  
  function sendMessage()
  {
    socket.emit("message",message)
  }



  return (
    <>

      <div className={styles.chat}>
      <h1>Welcome to ACG</h1>

      {
        rooms.map((room,index)=>{
          return(
            <div className={styles.room} key={index}>
              <h2>{room}</h2>
              <Link to ={"/chatroom/"+room} className= {styles.btn}> Join Room </Link>
              
            </div>
          )
        })
      }
      </div>

    </>
  )
}

export default Rooms