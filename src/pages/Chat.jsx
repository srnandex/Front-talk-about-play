// eslint-disable-next-line no-unused-vars
import React, {useRef, useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';
import { logout } from '../services/handleStorage';
import {Input} from '@mui/material'
import style from '../style/Chat.module.css'
import SendIcon from '@mui/icons-material/Send';
import ChatContext from '../context/ChatContext';
import io from 'socket.io-client'

export default function Chat() {

  const bottomRef = useRef()
  const messageRef = useRef()
  const [messageList, setMessageList] = useState([])
  const [loading, setLoading] = useState(true);
  const { nameUser } = useContext(ChatContext);

  const navigate = useNavigate();
  const socket = io('http://localhost:3001');
  
  useEffect(()=> {
    const getChat = async () => {
    try {
      setLoading(true);
      setToken()
      const data = await requestData ('/api/chat');
      console.log(nameUser);
      console.log(data);
      setMessageList((current) => [...current, data]);
      setLoading(false);
    } catch (error) {
      logout();
      navigate('/');
    }
  };
  getChat();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  useEffect(()=>{
    socket.on('recMessage', data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('recMessage')
  }, [socket])

  useEffect(()=>{
    if (messageList.length > 0) {
      scrollDown()
    }
  }, [messageList])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if(!message.trim()) return

    const formateMessage = {
      content: message,
      userId: nameUser.id,
      authorName: nameUser.name,
      created_at: new Date(),
    }

    socket.emit('sendMessage', formateMessage)
    clearInput()
    focusInput()
  }

  const clearInput = () => {
    messageRef.current.value = ''
  }

  const focusInput = () => {
    messageRef.current.focus()
  }

  // eslint-disable-next-line no-unused-vars
  const getEnterKey = (e) => {
    if(e.key === 'Enter')
      handleSubmit()
  }

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({behavior: 'smooth'})
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className={style['chat-container']}>
        <div className={style["chat-body"]}>
        {
          messageList.map((message,index) => (
            <div className={`${style["message-container"]} ${message.authorId === socket.id && style["message-mine"]}`} key={index}>
              <div className="message-author"><strong>{message.authorName}</strong></div>
              <div className="message-text">{message.content}</div>
            </div>
          ))
        }
        <div ref={bottomRef} />
        </div>
        <div className={style["chat-footer"]}>
          <Input inputRef={messageRef} placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)} fullWidth />
          <SendIcon sx={{m:1, cursor: 'pointer'}} onClick={()=>handleSubmit()} color="primary" />
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     <h1>CHAT FOR PLAY</h1>
    //     <div>
    //     {
    //       messageList.map((message,index) => (
    //         <div  key={index}>
    //           <div><strong>{message.authorName}</strong></div>
    //           <div>{message.content}</div>
    //         </div>
    //       ))
    //     }
    //     <div ref={bottomRef} />
    //     </div>
    //     <input ref={messageRef} placeholder='Mensagem' onKeyDown={(e)=>getEnterKey(e)}></input>
    //     <button onClick={()=>handleSubmit()}>Enviar</button>
    //   </div>
    // </div>
  )
}
