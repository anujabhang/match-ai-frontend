import React from "react";

export const MatchesList = () => {
  return (
    <div className="max-w-screen-md mx-60 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 mx-2">Matches</h2>
      <div className="mx-2 my-2">
        <ul>
          {[
            {
              id: "a4e6d728-17e2-48ca-ba4c-6b980dee7001",
              firstName: "Maya",
              lastName: "Smith",
              age: 25,
              ethnicity: "Black",
              gender: "FEMALE",
              bio: "Creative soul with a love for music and art. Enjoys outdoor activities and spontaneous road trips. Looking for someone to share life\u0027s beautiful moments.",
              imageUrl:
                "http://localhost:8081/images/a4e6d728-17e2-48ca-ba4c-6b980dee7001.jpg",
              myersBriggsPersonalityType: "INFP",
            },
            {
              id: "f8cb8344-862e-435d-b58a-15e0dcc87ac3",
              firstName: "Sophia",
              lastName: "Lee",
              age: 28,
              ethnicity: "Asian",
              gender: "FEMALE",
              bio: "Tech enthusiast and foodie. I enjoy coding by day and exploring new cuisines by night. Let\u0027s create something amazing together!",
              imageUrl:
                "http://localhost:8081/images/f8cb8344-862e-435d-b58a-15e0dcc87ac3.jpg",
              myersBriggsPersonalityType: "INTJ",
            }
          ].map((match) => {
            return (
              <li key={match.id} className="hover:bg-slate-200">
                <button className="flex p-4">
                  <img
                    src={match.imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />

                  <h1 className="text-xl font-bold mx-2 ">
                    {match.firstName} {match.lastName}
                  </h1>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
