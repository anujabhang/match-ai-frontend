import React, { useState } from "react";
import { User, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [userClicked, setUserClicked] = useState(true);
  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between">
        <Link to="/">
        <button className="hover:bg-slate-200 p-4">
          <User />
        </button>
        </Link>
        <Link to="/matches">
        <button className="hover:bg-slate-200 p-4" >
          <MessageCircle />
        </button>
        </Link>
      </div>
    </div>
  );
};
