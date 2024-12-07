import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Chat from './pages/Chat'
import Auth from "./hocs/Auth"
import SignUp from "./pages/SignUp"



function App() {


  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path="/" element = {<Login/>}></Route>
          <Route path="/login" element = {<Login/>}></Route>
          <Route path="/register" element = {<Register/>}></Route>
          <Route path="/chat" element = {<Auth children ={<Chat/>}/>}></Route>
          <Route path="/signup" element = {<SignUp/>}></Route>
  



        </Routes>
    
      </BrowserRouter>










    </>
  )
}

export default App
