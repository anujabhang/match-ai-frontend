import React, { useState } from "react";

export const ChatScreen = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      //check if user has entered only spaces
      console.log(input);
      setInput("");
    }
  };
  return (
    <div className="mx-60 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Chat with Anuj Abhang</h2>
      <div className="h-[50vh] border rounded overflow-y-auto mb-4 p-2">
        {[
          "Hi, how are you",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
          "I am good, thanks",
        ].map((message, index) => {
          return (
            <div key={index}>
              <div className="mb-4 p-2 rounded-lg bg-gray-200">{message}</div>
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
