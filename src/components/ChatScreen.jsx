import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Send } from "lucide-react"; // Import the User icon from Lucide
import { AuthContext } from "./AuthContext";

export const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState({});
  const [profile, setProfile] = useState({});
  const { chatId } = useParams();
  const { token, user } = useContext(AuthContext);

  // Redirect to login if not authenticated


  const fetchChat = async () => {
    const response = await fetch(`http://localhost:8081/conversations/${chatId}`,{
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the JWT token in the Authorization header
        'Content-Type': 'application/json'
      }
    }
      
    );
    const data = await response.json();
    setConversation(data);
  };

  const fetchProfile = async () => {
    if (!conversation?.profileId) {
      return;
    }
    console.log("ProfId: ",conversation.profileId)
    try {
      const response = await fetch(`http://localhost:8081/profile/${conversation?.profileId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the JWT token in the Authorization header
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [chatId, conversation]);

  useEffect(() => {
    fetchProfile();
  }, [conversation?.profileId]);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }
  
    const postData = {
      messageText: input,
      time: new Date().toISOString(),
      authorId: user.id,
    };
  
    try {
      const response = await fetch(`http://localhost:8081/conversations/${chatId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the JWT token in the Authorization header
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData), // Convert the postData object to a JSON string
      });
  
      if (!response.ok) {
        throw new Error("Error posting data, status: " + response.status);
      }
  
      const newMessage = await response.json(); // Parse the response data
      setConversation((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, newMessage],
      }));
    } catch (error) {
      console.error("Error posting data:", error);
    }
  
    setInput("");
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <div className="w-full max-w-2xl mx-auto rounded-lg shadow-lg p-4 flex flex-col h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">Chat with {profile.firstName} {profile.lastName}</h2>

        {/* Scrollable chat box */}
        <div className="flex-grow border rounded-lg overflow-y-auto p-4 mb-4 bg-gray-100">
          {conversation?.messages?.map((message, index) => {
            const isProfileMessage = message.authorId === profile.id;

            return (
              <div key={index} className={`flex items-end mb-4 ${isProfileMessage ? 'justify-end' : 'justify-start'}`}>
                {/* Show profile image for profile's messages */}
                {isProfileMessage && (
                  <img
                    src={`http://localhost:8081/images/${profile.imageUrl}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                <div
                  className={`p-3 max-w-xs rounded-xl ${
                    isProfileMessage
                      ? "bg-blue-500 text-white rounded-tr-none"
                      : "bg-gray-300 text-black rounded-tl-none"
                  }`}
                >
                  {message.messageText}
                </div>

                {/* Show <User/> icon for other user's messages */}
                {!isProfileMessage && (
                  <div className="ml-2">
                    <User className="w-8 h-8 text-gray-500" /> {/* Use the User icon */}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input and Send button */}
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border w-full rounded-lg p-2"
            placeholder="Type a message"
          />
          <button
            onClick={handleSend}
            className="border bg-blue-500 text-white rounded-full p-2 ml-2"
          >
            <Send/>
          </button>
        </div>
      </div>
    </div>
  );
};
