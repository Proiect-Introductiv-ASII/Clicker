import LeaderBoard from "./_components/LeaderBoard"; 
import { getLeaderBoard } from "../actions/getLeaderBoard";

const LeaderBoardPage = async () => {
    const currentLeaderBoard = await getLeaderBoard(); 
  return (
    <>
        <LeaderBoard
            currentLeaderBoard = { JSON.stringify(currentLeaderBoard) }
        />     
    </>
  )
}

export default LeaderBoardPage