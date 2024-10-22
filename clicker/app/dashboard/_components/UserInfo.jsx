"use client";

import { signOut } from 'next-auth/react';
import { useMemo } from 'react';

const UserInfo = ({ currentUser, currentLeaderBoard }) => {
  const user = JSON.parse(currentUser);
  console.log(currentLeaderBoard); 
  const leaderboard = JSON.parse(currentLeaderBoard); 

  console.log(leaderboard); 

  const placeInLeaderBoard = useMemo( () => {
    for(let i = 0; i < leaderboard?.length; i++) { 
        if(leaderboard[i]._id == user?._id) return i + 1; 
    }

    return -1; 
  }, [ leaderboard ]); 

  return (
    <div className="user-info-page">
      <div className="user-info-container form-style">
        <div className="user-info-item">
          Name:
          <span className="user-info-value"> {user?.name} </span>
        </div>
        { placeInLeaderBoard != -1 && 
            <div className="user-info-item">
              Place in leaderboard:
              <span className="user-info-value"> { placeInLeaderBoard } </span>
            </div>
        }
        <div className="user-info-item">
          Email:
          <span className="user-info-value"> {user?.email} </span>
        </div>
        <div className = "user-info-item">
          Level: 
          <span className = "user-info-value"> { user?.level } </span>
        </div>
        <div className = "user-info-item">
          Points: 
          <span className = "user-info-value"> { user?.points } </span>
        </div>
        <button className="logout-button" onClick={() =>- signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
