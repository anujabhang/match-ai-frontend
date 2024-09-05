import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatScreen } from "./ChatScreen";

export const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  useEffect(()=>{
    const fetchMatches = async () =>{
      const response = await fetch("http://localhost:8081/matches");
      const data = await response.json();
      // console.log("data: ", data);

      setMatches(data);
      

    }
    fetchMatches();
  }, [])

  // useEffect(() => {
  //   console.log("Matches state updated: ", matches);
  //   // console.log("Matches state id: ", matches[0].id);
  // }, [matches]);
  return (
    <div className="max-w-screen-md mx-60 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 mx-2">Matches</h2>
      <div className="mx-2 my-2">
        <ul>
          {matches.map((match) => {
            return (
                <Link key={match.id} to="/chats">
              <li  className="hover:bg-slate-200">
                <button className="flex p-4">
                  <img
                    src={`http://localhost:8081/images/${match.profile.imageUrl}`}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />

                  <h1 className="text-xl font-bold mx-2 ">
                    {match.profile.firstName} {match.profile.lastName}
                  </h1>
                </button>
              </li>
              </Link>
              
            );
          })}
        </ul>
      </div>
    </div>
  );
};
