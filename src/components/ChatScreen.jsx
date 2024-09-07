import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState({});
  const [profile, setProfile] = useState({});
  const {chatId} = useParams();

  const fetchChat = async () =>{
    const response = await fetch(`http://localhost:8081/conversations/${chatId}`);
      const data = await response.json();
      // console.log("data: ", data);

      setConversation(data);
  }

  const fetchProfile = async () =>{
    if(!conversation?.profileId){
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/profile/${conversation?.profileId}`);
      const data = await response.json();
      
      setProfile(data);
      // console.log("data: ", profile);
      
    } catch (error) {
      // console.log(error);
    }
    

  }



  useEffect(()=>{
    fetchChat();
  }, [chatId, conversation]);

  useEffect(()=>{
    fetchProfile();
    
  }, [conversation?.profileId]);


  const handleSend = async () => {
    if (!input.trim()) {
      //check if user has entered only spaces
      return;
    }
    const postData = {
      messageText: input,  // Ensure field names match the server's expected structure
      time: new Date().toISOString(),  // Send the current time if needed
      authorId: "user"
    };

    try {
      const response = await axios.post(`http://localhost:8081/conversations/${chatId}`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newMessage = response.data;  // Assuming the server returns the new message
      setConversation(prevState => ({
        ...prevState,
        messages: [...prevState.messages, newMessage]
      }));
      // console.log("Server Response:", response.data);
      
      } catch (error) {
      console.error("Error posting data:", error);
    }

    console.log(input);
    console.log(conversation?.messages);

    setInput("");
  };
  return (
    <div className="mx-60 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with {profile.firstName} {profile.lastName}</h2>
      <div className="h-[50vh] border rounded overflow-y-auto mb-4 p-2">
        {conversation?.messages?.map((message, index) => {
          return (
            <div key={index}>
              <div className="mb-4 p-2 rounded-lg bg-gray-200">{message.messageText}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          value={input} //value is not what we type e.target.value is what we type
          //this value we are just using to handleSend
          onChange={(e) => setInput(e.target.value)}
          className="border w-11/12 rounded-lg  overflow-y-auto mb-4 p-2"
          placeholder="Type a message"
        />
        <button
          onClick={handleSend}
          className="border bg-blue-500 text-white rounded-lg overflow-y-auto mb-4 mx-2 p-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
