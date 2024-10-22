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
};

export const dynamic = 'force-dynamic';

export default LeaderBoardPage