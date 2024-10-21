"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setPlayers(data);
    }

    fetchPlayers();
  }, []);

  return (
    <div className="leaderboard-container">
      <Navbar />
      <h1 className="heading">Leaderboard</h1>
      {players.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players found.</p>
      )}
    </div>
  );
}
