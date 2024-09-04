import React from "react";
import { X, Heart } from "lucide-react";



export const ProfileSelector = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="overflow-hidden bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="relative">
          <img
            src="http://localhost:8081/images/0b1273d4-ab2f-4edd-858b-6f1ff1071fb9.jpg"
            alt=""
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black">
            <h2 className="text-3xl font-bold">Anuj Abhang</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="text-gray-600 mb-4">
            I am a Software Engineer
          </div>
        </div>
      <div className="flex justify-center space-x-6">
        <button className="bg-red-500 rounded-full text-white p-2 hover:bg-red-700 my-2"><X size={24}/></button>
        <button className="bg-green-500 rounded-full text-white p-2 hover:bg-green-700 my-2"><Heart size={24}/></button>
      </div>
      </div>
    </div>
  );
};
