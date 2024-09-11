import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProfileSelector } from "./components/ProfileSelector";
import { MatchesList } from "./components/MatchesList";
import { ChatScreen } from "./components/ChatScreen";
import { RegisterForm } from "./components/RegisterForm";
import { LoginForm } from "./components/LoginForm";
// import { AuthProvider } from "./AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContext, AuthProvider } from "./components/AuthContext";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>


          {/* <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Protect these routes 
          <Route path="/" element={<ProtectedRoute element={<ProfileSelector />} />} />
          <Route path="/matches" element={<ProtectedRoute element={<MatchesList />} />} />
          <Route path="/chats/:chatId" element={<ProtectedRoute element={<ChatScreen />} />} /> */}


          <Route path="/login" element={<ProtectedRoute element={<LoginForm />} requireAuth={false} />} />
          <Route path="/register" element={<ProtectedRoute element={<RegisterForm />} requireAuth={false} />} />
          <Route path="/" element={<ProtectedRoute element={<ProfileSelector />} requireAuth={true} />} />
          <Route path="/matches" element={<ProtectedRoute element={<MatchesList />} requireAuth={true} />} />
          <Route path="/chats/:chatId" element={<ProtectedRoute element={<ChatScreen />} requireAuth={true} />} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
