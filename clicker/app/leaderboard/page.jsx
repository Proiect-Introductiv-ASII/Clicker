import LeaderBoard from "./_components/LeaderBoard"; 
import { getLeaderBoard } from "../actions/getLeaderBoard";

const LeaderBoardPage = async () => {
    const leaderboard = await getLeaderBoard(); 
  return (
    <>
        <LeaderBoard
            leaderboard = { JSON.stringify(leaderboard) }
        />     
    </>
  )
}

export default LeaderBoardPage