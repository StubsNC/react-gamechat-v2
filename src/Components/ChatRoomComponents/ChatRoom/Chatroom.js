import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { db, auth } from "../../../firebase-config";
import MessagesList from "../MessagesList/MessagesList";
import Header from "../ChatRoomHeader/Header";
import ChatForm from "../Chatform/ChatForm";
import "./chatRoomStyles.scss"; 

const ChatRoom = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textMessage = "textMessage";
  const messagesRef = collection(db, "messagesChat");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      type: textMessage,
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      room,
    });
    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  return (
    <div className="chatRoomContainer">
      <div className="chatRoomWrapper">
        <div className="fav_rooms"></div>
        <div className="chat_room_container">
          <div className="chat_room_header">
            <Header room={room} />
          </div>
          <MessagesList
            messages={messages}
            messagesEndRef={messagesEndRef}
            scrollToBottom={scrollToBottom}
          />
          <ChatForm
            handleSubmit={handleSubmit}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
