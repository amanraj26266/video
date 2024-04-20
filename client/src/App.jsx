import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LobbyScreen from './screen/Lobby';
import RoomPage from './screen/Room';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2> This is VideoCalling Application</h2>
      <Routes>
        <Route path='/' element={<LobbyScreen />} />
        <Route path='/room/:roomId' element={<RoomPage />} />
      </Routes>
    </>
  )
}

export default App
