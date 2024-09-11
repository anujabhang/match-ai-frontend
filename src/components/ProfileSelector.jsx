import React, { useContext, useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProfileSelector = () => {
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [clicked, setClicked] = useState(false);

  // Redirect to login if not authenticated
  // Consider adding a check to handle unauthenticated users

  const handleLeftSwipe = () => {
    setClicked(prevClicked => !prevClicked);
  };

  const handleRightSwipe = async () => {
    setClicked(prevClicked => !prevClicked);

    const postData = {
      userId: user.id,
      profileId: profile.id
    };

    try {
      const response = await fetch(`http://localhost:8081/matches`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Match added');
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const truncateBio = (bio, wordLimit) => {
    if (!bio) return ""; // Return an empty string if bio is undefined or null
    const words = bio.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return bio;
  };

  useEffect(() => {
    if (user && user.lookingForGender) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`http://localhost:8081/profile/${user.lookingForGender}/random`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProfile(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [clicked, user, token]); // Added token to dependencies

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="overflow-hidden bg-white shadow-lg rounded-lg w-full max-w-md h-[90vh] flex flex-col justify-between">
        <div className="relative">
          <img
            src={`http://localhost:8081/images/${profile.imageUrl}`}
            alt="Profile"
            className="rounded-lg object-cover w-full h-[60vh]" // Limiting image height
          />
          <div className="absolute bottom-0 left-0 right-0 text-white p-4 bg-gradient-to-t from-black">
            <h2 className="text-2xl font-bold">
              {profile.firstName} {profile.lastName}, {profile.age}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="text-gray-600 mb-4">
            {truncateBio(profile.bio, 20)} {/* Truncate bio to 20 words */}
          </div>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <button
            onClick={handleLeftSwipe}
            className="bg-red-500 rounded-full text-white p-3 hover:bg-red-700"
          >
            <X size={24} />
          </button>
          <button
            onClick={handleRightSwipe}
            className="bg-green-500 rounded-full text-white p-3 hover:bg-green-700"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
