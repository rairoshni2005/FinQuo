import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rooms from './pages/Rooms';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Rooms />} />
          <Route path='/chatroom/:roomname' element={<ChatRoom/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
