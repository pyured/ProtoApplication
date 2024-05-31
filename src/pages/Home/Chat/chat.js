import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import sendIcon from "./images/images/sendIcon.png";
import protoLogo from "./images/images/protoLogo.png";
import upIcon from "./images/images/upIcon.png";
import downIcon from "./images/images/downIcon.png";
import protoAvatarLogo from "./images/images/protoavatarlogo.png";
import userIcon from "./images/images/profile-user.png";
import "./style.scss"

function Chat(){
    const[userHist, setUserHist] = useState([]);
    const[queryContent, setQueryContent] = useState("");
    const [height, setHeight] = useState(0);
    const [showClose, setShowClose] = useState(false);
    const [closed, setClosed] = useState(false);
    const ref = useRef(null);
    const endOfHistory = useRef(null);
    const mainForm = useRef(null);
    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })
    useEffect(() => {
        endOfHistory.current?.scrollIntoView({behavior: 'smooth'});
        console.log("should scroll to bottom");
    }, [userHist])
    const url = 'https://ddna-nagarro-inc14e1--careerpathwaysproto.soului.dh.soulmachines.cloud/?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU4OTEwODgsImlzcyI6InNpZ25lZF91cmwtYWI1MDczYTEtNzAxMy00NWQ2LTlkMTktNGNhMGE2NDJlN2M0IiwiZXhwIjoxODAyMjA0Njg4LCJlbWFpbCI6Im5hZ2Fycm8taW5jMTRlMS0tY2FyZWVycGF0aHdheXNwcm90b0BkZG5hLnN0dWRpbyIsInNvdWxJZCI6ImRkbmEtbmFnYXJyby1pbmMxNGUxLS1jYXJlZXJwYXRod2F5c3Byb3RvIn0.G87zwz-1BLw8UHDEZtQQFQVCqiX6f-xoBp2A3bi9JHs';
    const resetForm = () => {
        setQueryContent("");
    }
    const handleSubmit = (e) => {
        setShowClose(true);
        e.preventDefault();
        const newEntry = {
            type: "User",
            content: queryContent
        };
        const textQuery = {
            "text": queryContent
        }
        axios.post('https://proto-api.azurewebsites.net/Query', textQuery)
            .then(response => {
                console.log(response.data);
                let responseContent = response.data;
                const newEntry = {
                    type: "Bot",
                    content: responseContent
                }
                setUserHist((prev) => {
                    return [...prev, newEntry];
                  })
            })
            .catch(error => {
                console.error(error);
            });
        setUserHist((prev) => {
          return [...prev, newEntry];
        })
        resetForm();
    }
    const handleClick = (e) => {
        if (closed)
            {
                setClosed(false);
            }else{
                setClosed(true);
            }
    }

    const imgType = {
        "User": userIcon,
        "Bot": protoAvatarLogo
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !(closed || queryContent === "" || queryContent.trim().length === 0) && !event.shiftKey) {
            
            handleSubmit(event);
            console.log(event);
        }
      };
    return (
        <div className="chat-area" ref={ref}>
            <div className="history">
                <h1>
                    <img src={protoLogo} className="logo"/>
                    {/* <img src={protoavatarlogo} className="logo"/> */}
                    Hi there! I'm Proto,  the AI assistant for NYC Public Schools.<br></br> How can I help you today?
                    <button type="button" className='redirect justify-end' onClick={() => window.open(url, '_blank')}>
                        {/* <img src={protoavatarlogo} className="logo"/> */}
                        Let's talk face to face!
                    </button>
                </h1>
                {/* <div className="intro">Your chat history with Proto will appear here.</div> */}
                {userHist?.length? !closed ?
                <div className="historyList">
                    {userHist.map((entry, i) => (
                        <div className={`entryHolder ${entry.type === "User" ?  "left" : "right"}`}>
                            {entry.type === "User" ? 
                                <>
                                    <div key={i} className={`entry ${entry.type === "User" ?  "left" : "right"}`}>
                                        {entry.content}
                                    </div>
                                    <img className="chatter-icon" alt="Chatter icon" src={imgType[entry.type]}/>
                                </>:
                                <>
                                    <img className="chatter-icon" alt="Chatter icon" src={imgType[entry.type]}/>
                                    <div key={i} className={`entry ${entry.type === "User" ?  "left" : "right"}`}>
                                        {entry.content}
                                    </div>
                                </>
                            }
                        </div>
                    ))}
                    <div ref={endOfHistory}></div>
                </div> : 
                <div className="historyList">...</div>
                :<div className="historyList"></div>}
            </div>
            <div className="formContainer">
                <form className="chat-input" onSubmit={handleSubmit}>
                    <textarea className="input-box" type="text" placeholder="Ask me anything..." value={queryContent} onInput={(e) =>{
                    setQueryContent(e.target.value);
                    }} onKeyDown={handleKeyDown}></textarea>
                    {height > 380 || showClose ?
                        <button className="close-input" type="button" value="Submit" onClick={handleClick}>
                            <img src={closed ? downIcon : upIcon}/>
                        </button>:
                        <div className="temporary"></div>    
                    }
                    <button className="submit-input" type="submit" value="Submit" disabled={closed || queryContent === "" || queryContent.trim().length === 0}>
                        <img src={sendIcon}/>
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Chat;