import React from 'react';
// import { Row, Col } from 'react-bootstrap';


const FormInput = ({ handleSubmit, newMessage, setNewMessage }) => {
    return (

            <form className='message_input_container' onSubmit={handleSubmit}>
                <input
                    placeholder="Type your message here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type="submit">Send</button>
            </form>
        
    );
};

export default FormInput;

