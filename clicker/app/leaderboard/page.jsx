"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  const [players, setPlayers] = useState(["George"]);

  return (
    <>
    <Navbar />
        <div className="leaderboard-container">
        <h1 className="heading">Leaderboard</h1>
        {players.length > 0 ? (
            <table className="leaderboard-table">
            <thead>
                <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Level</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                <tr key={player._id}>
                    <td>1</td>
                    <td>George</td>
                    <td>14</td>
                </tr>
                ))}
            </tbody>
            </table>
        ) : (
            <p>No players found.</p>
        )}
        </div>
    </>
  );
}
