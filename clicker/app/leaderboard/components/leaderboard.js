import connectMongo from "../../utils/connectMongo";
import Player from "../../models/Player"; // Assuming you have a Player model

export default async function handler(req, res) {
  await connectMongo();

  try {
    const players = await Player.find().sort({ score: -1 }).limit(10); // Top 10 players by score
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Failed to load leaderboard data" });
  }
}
