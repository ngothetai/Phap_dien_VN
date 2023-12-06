import '../assets/sass/components/_q&a.scss';
import logo from '../../src/assets/images/logoWhite.png';
import user from '../../src/assets/images/user.png';
import chatbot from '../../src/assets/images/chatbot.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading/Loading';
import Header from '../components/Header/Header';
const QuestionAndAnswer = () => {
    const msgEnd = useRef(null);
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Xin chào👋 Tôi có thể giúp gì cho bạn!!!",
            isBot: true
        }
    ]);
    const [isBotTyping, setIsBotTyping] = useState(false);


    useEffect(() => {
        msgEnd.current.scrollIntoView()
    }, [messages])


    const handleNewChat = () => {
        setTimeout(() => {
            setMessages([
                {
                    text: "Xin chào👋 Tôi có thể giúp gì cho bạn!!!",
                    isBot: true
                }
            ])
        }, 200);
    }


    const handleSend = async (e) => {
        try {
            e.preventDefault();
            if (input.trim() === '') return;
            const textInput = input;
            setInput("");
            setIsBotTyping(true);
            setMessages([...messages, {
                text: textInput,
                isBot: false
            }])
            const res = await axios.post("http://103.140.39.166:80/api/question/", { "content": textInput });
            // console.log(res);
            setTimeout(() => {
                setMessages([
                    ...messages,
                    {
                        text: textInput,
                        isBot: false
                    },
                    {
                        text: res.data.result,
                        isBot: true
                    }
                ])
            }, 1000);


        } catch (e) {
            console.log(e);
            if (input.trim() === '') return;
            const textInput = input;
            setInput("");
            setTimeout(() => {
                setMessages([
                    ...messages,
                    {
                        text: textInput,
                        isBot: false
                    },
                    {
                        text: "Mạng của bạn hiện tại đang bị lỗi, hãy kiểm tra lại mảng, hoặc reload lại trang nha 🥰",
                        isBot: true
                    }
                ])
            }, 1000);
            setError(true)
        } finally {
            setTimeout(() => {
                setIsBotTyping(false);
            }, 1000);
        }
    }
    return (
        <div className="chatbot">
            <div className="sideBar">
                <div className="upperSide">
                    <div className="upperSideTop" onClick={() => navigate("/")}>
                        <img src={logo} alt="" className="logo" />
                    </div>
                    <button onClick={handleNewChat} style={{ cursor: "pointer" }} className="midBtn btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                        New Chat
                    </button>
                </div>
                <div className="lowerSide">
                    <button className='listItems btn' onClick={() => navigate("/")}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" /></svg>
                        Home
                    </button>
                    <button onClick={() => navigate("/chatbot")} className='listItems btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" /></svg>
                        Q & A
                    </button>
                </div>
            </div>
            <div className="main">
                <Header />
                <div className="chats">
                    {
                        messages && messages.length > 0 ? (
                            messages.map((item, index) => {
                                return (
                                    <div key={index} className={item.isBot ? "chat" : "chat user"}>
                                        <img src={item.isBot ? chatbot : user} alt="" />
                                        <div className='txt'>
                                            <p>{item.isBot ? "Chatbot" : "You"}</p>
                                            <p>
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : <Loading />
                    }
                    <div ref={msgEnd}></div>
                </div>
                <div className="chatFooter">
                    <form action="" onClick={handleSend}>
                        <input type="text" disabled={error} name="" value={input} id="" placeholder='Tìm kiếm...' onChange={(e) => setInput(e.target.value)} />
                        <button type='submit' disabled={isBotTyping}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default QuestionAndAnswer;