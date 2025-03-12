'use client';

import { useState, useEffect } from 'react';
import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Timestamp } from 'mongodb';

export default function Messages() {
    const [requestsAccepted, setAcceptedRequests] = useState([]);
    const [requestsReceived, setReceivedRequests] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userData, setUserData] = useState(null);
    //const [doneDeal, setDoneDeal] = useState({});
    
    
    useEffect(() => {
       // Fetch the session email
       const fetchUserData = async () => {
         const response = await fetch('/api/getData');
         const data = await response.json();
   
         if (data.email && data.fullName) {
           setUserData(data);
           console.log('Header get Data call successful');
         } else {
           //console.error('No user data found');
         }
       };
       fetchUserData();
     }, []);
    
    useEffect(() => {
        fetch('/api/getAcceptedRequest')
            .then((res) => res.json())
            .then((data) => {
                setAcceptedRequests(data);
                if (data.length > 0) setCurrentChat(data[0]); // Set default chat
            })
            .catch((error) => console.error('Error fetching requests:', error));
    }, []);

    useEffect(() => {
        fetch('/api/getReceivedRequest')
            .then((res) => res.json())
            .then((data) => {
                setReceivedRequests(data);
                if (data.length > 0) setCurrentChat(data[0]); // Set default chat
            })
            .catch((error) => console.error('Error fetching requests:', error));
    }, []);

    useEffect(() => {
        if (currentChat) {
            fetch(`/api/getMessages?requestId=${currentChat._id}`)
                .then((res) => res.json())
                .then((data) =>{ 
                    if (data.length > 0) setMessages(data[0].messages); })
                .catch((error) => console.error('Error fetching messages:', error));
        }
    }, [currentChat]);


    // function putInMessages(userName, userEmail, itemName, message) {
    //     fetch(`/api/putInMessages?messages=${encodeURIComponent(message)}&userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(userEmail)}&itemName=${encodeURIComponent(itemName)}`)
    //         .then(() => {
    //             setMessages([...messages, { senderName: 'You', messages: message, DateMessaged: new Date() }]);
    //             setNewMessage('');
    //         })
    //         .catch((error) => console.error('Error sending message:', error));
    // }

    function putInMessages(requestId,  message) {
        fetch(`/api/putInMessages?messages=${encodeURIComponent(message)}&requestId=${encodeURIComponent(requestId)}`)
        .then(() => {
                        setMessages([...messages, { senderName: userData.fullName, email:userData.email, message: newMessage, Timestamp: new Date() }]);
                        setNewMessage('');
                    })
                    .catch((error) => console.error('Error sending message:', error));
        
        }

    function onSelectUser(request){
        setCurrentChat(request);
        //get nessages for selected user
        fetch(`/api/getMessages?requestId=${currentChat._id}`)
        .then((res) => res.json())
        .then((data) =>{ 
            if (data.length > 0) setMessages(data[0].messages);
            else setMessages([]); }) 
        .catch((error) => console.error('Error fetching messages:', error));
    }

    function updateDeal(){
        
        //set deal status
        fetch(`/api/updateDealStatus?requestId=${currentChat._id}&itemId=${currentChat.itemId}&swapItemId=${currentChat.swapItemId}`);
        // .then((res) => res.json())
        // .then((data) =>{ 
        //     if (data.length > 0) setMessages(data[0].messages);
        //     else setMessages([]); }) 
        // .catch((error) => console.error('Error fetching messages:', error));
    }


    

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2>Messages</h2>
                <div className="row">
                     {/* Sidebar */}
                     <div className="col-md-4 border-end">
                         <h5 className="mb-3">Received Swaps</h5>
                         <div className="list-group">
                             {requestsReceived.map((request) => (
                                <button
                                    key={request._id}
                                    // disabled={request.dealStatus==='Sold'}
                                    className={`list-group-item list-group-item-action ${currentChat && currentChat._id === request._id ? 'active' : ''}`}
                                    onClick={() => onSelectUser(request)}
                                >
                                    {/* {request.senderName}{request.itemName} - {request.swapItemName} {request.dealStatus==='Sold'?'Sold':''} */}
                                    <div><strong>{request.senderName}</strong></div>
                                    <div>{request.swapItemName}</div>
                                    {request.dealStatus === 'Sold' && <div><strong>Sold</strong></div>}
                                </button>
                            ))}
                        </div> 


<br></br><br></br><br></br>
                         <h5 className="mb-3">Accepted Swaps</h5>
                         <div className="list-group">
                             {requestsAccepted.map((request) => (
                                <button
                                    key={request._id}
                                    className={`list-group-item list-group-item-action ${currentChat && currentChat._id === request._id && request.dealStatus==='Open' ? 'active' : ''}`}
                                    onClick={() => onSelectUser(request)}
                                >
                                    {/* {request.itemName} - {request.swapItemName} */}
                                    <div><strong>{request.userName}</strong></div>
                                    <div>{request.itemName}</div>
                                    {request.dealStatus === 'Sold' && <div><strong>Sold</strong></div>}
                                </button>
                            ))}
                        </div>                     
                    </div>


                    

                      {/* Chat Window */}
                       <div className="col-md-8">
                         {currentChat ? (
                             <div className="card">
                                {/* <div className="card-header bg-primary text-white">
                                    <h6>{currentChat.senderName}</h6>
                                    <button className="btn btn-primary" >Close Deal</button>
                                </div> */}
                                
                                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">{currentChat.senderName} :</h6>
                                    <button className="btn btn-light ms-auto" onClick={() => updateDeal(currentChat._id)}>Close Deal</button>
                                </div>


                                <div className="chat-box border p-3" style={{ height: '400px', overflowY: 'scroll' }}>
                             {messages.map((msg, index) => (
                                 <div key={index} className={`mb-2 ${msg.senderName === 'You' ? 'text-end' : ''}`}>
                                     <strong>{msg.senderName}:</strong> {msg.message}
                                     {/* <strong>{msg.senderName}:</strong> {msg.messages} */}
                                     <br /><small className="text-muted">{new Date(msg.Timestamp).toLocaleString()}</small>
                                 </div>
                             ))}
                         </div>

                                <div className="card-footer">
                                    <div className="input-group">
                                    <input type="text" className="form-control" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                             <button className="btn btn-primary" onClick={() => putInMessages(currentChat._id, newMessage)}>Send</button>
                             
                         </div>
                                </div>
                            </div>
                        ) : (
                            <p>Select a chat to start messaging.</p>
                        )}
                    </div>
               </div>
            </div>


                {/* </div>
            </div> */}


            <Footer />
        </>
    );
}


