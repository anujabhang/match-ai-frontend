import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProfileSelector } from "./components/ProfileSelector";
import { MatchesList } from "./components/MatchesList";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChatScreen } from "./components/ChatScreen";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfileSelector />} />
          <Route path="/matches" element={<MatchesList />} />
          <Route path="/chats" element={<ChatScreen />} />
        </Routes>
      </Router>
    </>
  );

  //npm install -D stores dependencies into Devdependencies
}

export default App;
