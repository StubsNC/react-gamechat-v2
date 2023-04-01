import React from 'react';
import { useEffect, useRef } from 'react';
// import "../ChatRoom/chatRoomStyles.scss"

import { auth } from '../../../firebase-config';


const MessageList = ({ messages }) => {
    const currentUser = auth.currentUser;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={messagesEndRef} className="messages_list_container scrollbar-hidden">
            {messages.map((message) => (
                <div
                    // className='messagesWrapper'
                    // className={` ${message.user === currentUser ? 'current-user' : ''}`}
                    key={message.id}
                >
                    {message.public_url ? (
                        <>
                            <div className='singleMessageWrapper'>
                                <img
                                    className='profilePicture'
                                    src={message.photoURL}
                                    alt={message.user}
                                    style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '5px' }}
                                />
                                <video
                                    src={message.public_url}
                                    className="video"
                                    style={{
                                        height: '150px',
                                        width: '200px',
                                        borderRadius: '30px',
                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                        objectFit: 'fill',
                                    }}
                                    controls
                                ></video>
                            </div>
                        </>
                    ) : (
                        <>
                            {message.photoURL ? (
                                <img
                                    className='profilePicture'
                                    src={message.photoURL}
                                    alt={message.user}
                                    style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '5px' }}
                                />
                            ) : (
                                <span>{message.user}: </span>
                            )}
                            <span>{message.text}</span>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
