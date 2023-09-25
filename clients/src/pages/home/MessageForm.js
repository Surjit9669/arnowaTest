import axios from 'axios';
import React, { useState } from 'react';
import { BACKEND_URL } from '../../config';

export default function MessageForm() {
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        const tempUser = localStorage.getItem('user');
        const user = JSON.parse(tempUser);

        setLoading(true);

        if (message.trim() !== '') {
            const newMessage = {
                text: message,
                timestamp: new Date()
            };

            try {
                await saveMessage(newMessage, user);
                setLoading(false)
                setMessages([...messages, newMessage])
                setMessage('');
            } catch (error) {
                console.error('Error saving message:', error);
            }
        }

    };



    const saveMessage = (data, user) => {

        axios
            .post(`${BACKEND_URL}/msg/message`, data, {
                headers: { 'authorization': user.token },
            })
            .then((r) => {
                alert(r.data.message);
                // setMessages(r?.data?.data?.messages)
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="msg-form">

                <div className="form-group">
                    <label>message:</label>
                    <textarea
                        rows="4"
                        cols="50"
                        name='message'
                        placeholder="Type your message here"
                        value={message}
                        onChange={handleChange}
                        data-gramm="false"
                        required

                    ></textarea>
                </div>

                <button type="submit" onClick={handleSubmit}>Save</button>


            </div>
            <div>
                <h4>Messages table:</h4>


                <table>
                    <thead>
                        <tr>
                            <th>Messages</th>
                            <th>Message Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg, index) => (

                            <tr key={index}>
                                <td> {msg.text} </td>
                                <td>{msg.timestamp.toLocaleString()} </td>

                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>
        </>
    );
}
