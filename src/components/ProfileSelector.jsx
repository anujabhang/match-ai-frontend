import React, { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import axios from "axios";

export const ProfileSelector = () => {
  const [profile, setProfile] = useState({});
  const [clicked, setClicked] = useState(false);

  const handleLeftSwipe = () => {
    clicked ? setClicked(false) : setClicked(true);
  };

  const handleRightSwipe = async () => {
    clicked ? setClicked(false) : setClicked(true);

    const postData = {
      profileId: profile.id,
    };

    try {
      await axios.post("http://localhost:8081/matches", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const truncateBio = (bio, wordLimit) => {
    if (!bio) return "";  // Return an empty string if bio is undefined or null
    const words = bio.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return bio;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:8081/profile/random");
      const data = await response.json();
      setProfile(data);
    };
    fetchProfile();
  }, [clicked]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="overflow-hidden bg-white shadow-lg rounded-lg w-full max-w-md h-[90vh] flex flex-col justify-between">
        <div className="relative">
          <img
            src={`http://localhost:8081/images/${profile.imageUrl}`}
            alt=""
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
            {truncateBio(profile.bio, 25)} {/* Truncate bio to 25 words */}
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
