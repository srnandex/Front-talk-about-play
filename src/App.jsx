// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Registration from './pages/Registration';
import ChatProvider from './context/ChatProvider';
import Login from './pages/Login';
import Chat from './pages/Chat'

export default function App() {
  return (
    <ChatProvider>
      <Routes>
        <Route exact path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Registration /> } />
        <Route path="/chat" element={ <Chat /> } />
      </Routes>
    </ChatProvider>  
  );
}
