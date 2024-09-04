import React from "react";
import { User, MessageCircle } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="max-w-md mx-auto">
    <div className="flex justify-between">
      <User />
      <MessageCircle />
    </div>
    </div>
  );
};
