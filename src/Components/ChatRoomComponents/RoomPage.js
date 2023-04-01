import React, { useState, useRef } from "react";
import Cookies from 'universal-cookie';
import ChatRoom from "./ChatRoom/Chatroom";
import "./roomStyles.scss";
const cookies = new Cookies()


function Room() {
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)
  const placeholder = 'Room Key'

  return (
    <>
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div className="roomContainer">
          <section className="roomWrapper">
            <p className="roomHeader">
              Join an existing Room or Create your Own
            </p>
            <p className="roomSubHeader">Remember to be careful of who you share your room key with!</p>
            <form className="roomFormContainer">
              <input type="text" ref={roomInputRef} />
              <button type="button" placeholder={placeholder} onClick={() => setRoom(roomInputRef.current.value)}>
                Enter Chat
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default Room;

