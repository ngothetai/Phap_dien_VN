import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import '../assets/sass/components/_q&a.scss';

const QuestionAndAnswer = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        setMessages([
            {
                id: 1,
                className: "messages incoming",
                messages: "Xin chào👋 Tôi có thể giúp gì được cho bạn?"
            }
        ]);
    };

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (userInput.trim() === '') return;

        const userMessage = {
            id: messages.length + 1,
            className: "messages outgoing",
            messages: userInput,
        };

        const chatbotResponse = {
            id: messages.length + 2,
            className: "messages incoming",
            messages: 'This is a chatbot response.',
        };

        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setUserInput('');

        setTimeout(() => {
            setMessages([...newMessages, chatbotResponse]);
        }, 1000);
    };


    return (
        <div className="chatbot">
            <div className="chat-history">
                <h1>Lịch sử trò chuyện</h1>
            </div>
            <div className="chat">
                <Header />
                <ul className="chatbox">
                    {messages.length ? (
                        messages.map((item) => (
                            <li className={item.className} key={item.id}>
                                <p>
                                    <span>{item.id % 2 === 0 ? "You" : "Chatbot"}</span>
                                    <p>{item.messages}</p>
                                </p>
                            </li>
                        ))
                    ) : (
                        <div className="chatbox">Loading...</div>
                    )}
                </ul>
                <form className="inp-chat" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Nhập câu hỏi của bạn..."
                    />
                    <button type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionAndAnswer;
