import React, { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";



export const ProfileSelector = () => {
  const [profile, setProfile] = useState({});
  const [clicked, setClicked] = useState(false);

  const handleLeftSwipe = ()=>{
    clicked?setClicked(false):setClicked(true);
  }

  const handleRightSwipe = ()=>{
    clicked?setClicked(false):setClicked(true);
  }
  useEffect(()=>{
    const fetchProfile = async () =>{
      const response = await fetch("http://localhost:8081/profile/random");
      const data = await response.json();
      // console.log("data: ", data);

      setProfile(data);
      

    }
    fetchProfile();
  }, [clicked])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="overflow-hidden bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="relative">
          <img
            src={`http://localhost:8081/images/${profile.imageUrl}`}
            alt=""
            className="rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black">
            <h2 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="text-gray-600 mb-4">
            {profile.bio}
          </div>
        </div>
      <div className="flex justify-center space-x-6">
        <button onClick={handleLeftSwipe} className="bg-red-500 rounded-full text-white p-2 hover:bg-red-700 my-2"><X size={24}/></button>
        <button onClick={handleRightSwipe} className="bg-green-500 rounded-full text-white p-2 hover:bg-green-700 my-2"><Heart size={24}/></button>
      </div>
      </div>
    </div>
  );
};
