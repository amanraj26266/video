import React, { useState, useCallback, useEffect } from 'react'
import { useSocket } from '../context/SocketProvider';
import { Navigate, useNavigate } from "react-router-dom";
import '../App.css';

const LobbyScreen = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();

  const navigate = useNavigate();

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', { email, room });

  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    navigate(`/room/${room}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    }
  }, [socket, handleJoinRoom]);

  return (
    <div className='Lobby'>
      <h1 className='head'>LobbyScreen </h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email"> Email Id : </label>
        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label htmlFor="room"> Room No : </label>
        <input type="text" id='room' value={room} onChange={(e) => setRoom(e.target.value)} /><br />
        <button>Join</button>
      </form>
    </div>


  )
}

export default LobbyScreen;