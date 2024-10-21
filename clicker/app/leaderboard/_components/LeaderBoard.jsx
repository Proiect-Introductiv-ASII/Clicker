"use client"

import { useState } from "react";
import Navbar from "@/app/components/Navbar";

const LeaderBoard = ({ leaderboard }) => {
    const currentLeaderBoard = JSON.parse(leaderboard); 
  return (
    <>
    <Navbar />
        <div className="leaderboard-container">
        
        <h1 className="heading">Leaderboard</h1>
        {currentLeaderBoard.length > 0 ? (
            <table className="leaderboard-table">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Level</th>
                </tr>
            </thead>
            <tbody>
                {currentLeaderBoard.map((player, index) => (
                <tr key={player._id}>
                    <td> { index } </td>
                    <td> { player.name } </td>
                    <td> { player?.level } </td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p>No players found.</p>
        )}
        </div>
    </>
  )
}

export default LeaderBoard